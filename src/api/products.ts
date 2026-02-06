import type { Product } from '../types/product';

const GOOGLE_BOOKS_BASE = 'https://www.googleapis.com/books/v1/volumes';
const OPEN_LIBRARY_BASE = 'https://openlibrary.org/search.json';

/** Raw book shape from Google Books API */
interface GoogleBookVolume {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    categories?: string[];
    publishedDate?: string;
    pageCount?: number;
  };
  saleInfo?: {
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
    retailPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
  searchInfo?: {
    textSnippet?: string;
  };
}

interface GoogleBooksResponse {
  items?: GoogleBookVolume[];
  totalItems: number;
  error?: {
    code: number;
    message: string;
    errors?: Array<{ reason: string }>;
  };
}

/** Raw book shape from Open Library API */
interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  cover_edition_key?: string;
  first_sentence?: string[];
  subject?: string[];
}

interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
  numFound: number;
}

/**
 * Generates a mock price for books that don't have pricing info.
 * Uses a range based on book characteristics.
 */
function generateMockPrice(book: GoogleBookVolume): number {
  const pageCount = book.volumeInfo.pageCount || 300;
  const basePrice = 9.99;
  const pageMultiplier = Math.min(pageCount / 100, 5); // Cap at 5x
  return Math.round((basePrice * pageMultiplier) * 100) / 100;
}

/**
 * Cleans HTML tags and entities from text snippet.
 */
function cleanTextSnippet(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Normalizes an Open Library doc to our app Product type.
 */
function mapOpenLibraryToProduct(doc: OpenLibraryDoc): Product {
  const title = doc.title || 'Untitled Book';
  const author = doc.author_name?.[0] || 'Unknown Author';
  const description = doc.first_sentence?.[0] || `A book by ${author}. Published in ${doc.first_publish_year || 'unknown year'}.`;
  
  // Generate cover image URL
  const image = doc.cover_i
    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
    : 'https://via.placeholder.com/300x400?text=No+Cover';

  // Generate numeric ID from key
  const numericId = Math.abs(
    doc.key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );

  // Generate mock price based on publish year (older books cheaper)
  const basePrice = 9.99;
  const yearMultiplier = doc.first_publish_year
    ? Math.max(0.5, 1 - (2024 - doc.first_publish_year) / 100)
    : 1;
  const price = Math.round((basePrice * yearMultiplier) * 100) / 100;

  return {
    id: numericId,
    title,
    description,
    price,
    image,
    authors: doc.author_name,
    categories: doc.subject,
    publishedDate: doc.first_publish_year?.toString(),
    pageCount: undefined, // Open Library doesn't provide page count in search results
  };
}

/**
 * Normalizes a Google Books volume to our app Product type.
 * Uses thumbnail image; generates mock price if API doesn't provide.
 */
function mapGoogleBookToProduct(raw: GoogleBookVolume): Product {
  const displayTitle = raw.volumeInfo.title;

  // Get description: prefer volumeInfo.description, fallback to searchInfo.textSnippet
  let description = raw.volumeInfo.description;
  if (!description && raw.searchInfo?.textSnippet) {
    description = cleanTextSnippet(raw.searchInfo.textSnippet);
  }
  if (!description) {
    description = 'No description available.';
  }

  // Get price from saleInfo or generate mock price
  let price = 0;
  if (raw.saleInfo?.listPrice?.amount) {
    price = raw.saleInfo.listPrice.amount;
  } else if (raw.saleInfo?.retailPrice?.amount) {
    price = raw.saleInfo.retailPrice.amount;
  } else {
    price = generateMockPrice(raw);
  }

  // Get image - prefer thumbnail, fallback to smallThumbnail
  const image =
    raw.volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') ||
    raw.volumeInfo.imageLinks?.smallThumbnail?.replace('http://', 'https://') ||
    'https://via.placeholder.com/300x400?text=No+Cover';

  // Use volume ID as numeric ID (hash the string to a number)
  const numericId = Math.abs(
    raw.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );

  return {
    id: numericId,
    title: displayTitle,
    subtitle: raw.volumeInfo.subtitle,
    description,
    price,
    image,
    authors: raw.volumeInfo.authors,
    categories: raw.volumeInfo.categories,
    publishedDate: raw.volumeInfo.publishedDate,
    pageCount: raw.volumeInfo.pageCount,
  };
}

/**
 * Fetches books from Open Library API as fallback.
 */
async function fetchFromOpenLibrary(limit: number): Promise<Product[]> {
  const queries = ['programming', 'business', 'fiction', 'technology', 'science'];
  const allBooks: OpenLibraryDoc[] = [];
  const booksPerQuery = Math.ceil(limit / queries.length);

  for (const query of queries) {
    if (allBooks.length >= limit) break;

    try {
      const res = await fetch(
        `${OPEN_LIBRARY_BASE}?q=${encodeURIComponent(query)}&limit=${booksPerQuery}&fields=key,title,author_name,first_publish_year,cover_i,cover_edition_key,first_sentence,subject`
      );
      if (!res.ok) continue;
      const data: OpenLibraryResponse = await res.json();
      if (data.docs && data.docs.length > 0) {
        // Filter out books without covers for better UX
        const booksWithCovers = data.docs.filter((doc) => doc.cover_i);
        allBooks.push(...booksWithCovers);
      }
    } catch (error) {
      console.warn(`Failed to fetch from Open Library for query "${query}":`, error);
      continue;
    }
  }

  // Remove duplicates by title and limit
  const uniqueBooks = Array.from(
    new Map(allBooks.map((book) => [book.title, book])).values()
  ).slice(0, limit);

  return uniqueBooks.map(mapOpenLibraryToProduct);
}

/**
 * Fetches books from Google Books API and returns normalized Product[].
 * Falls back to Open Library if Google Books fails (e.g., 429 quota exceeded).
 * Searches for popular books across different categories.
 */
export async function fetchProducts(limit = 30): Promise<Product[]> {
  // Search for popular books across multiple categories
  const queries = [
    'programming',
    'business',
    'fiction',
    'self-help',
    'technology',
  ];

  const allBooks: GoogleBookVolume[] = [];
  const booksPerQuery = Math.ceil(limit / queries.length);
  let hasRateLimitError = false;

  for (const query of queries) {
    if (allBooks.length >= limit) break;

    try {
      const res = await fetch(
        `${GOOGLE_BOOKS_BASE}?q=${encodeURIComponent(query)}&maxResults=${booksPerQuery}&orderBy=relevance`
      );
      
      // Check for 429 rate limit error
      if (res.status === 429) {
        hasRateLimitError = true;
        console.warn('Google Books API quota exceeded (429). Will try fallback.');
        break;
      }
      
      if (!res.ok) continue;
      
      const data: GoogleBooksResponse = await res.json();
      
      // Check for error in response body (Google sometimes returns 200 with error object)
      if (data.error) {
        if (data.error.code === 429 || data.error.errors?.some(e => e.reason === 'rateLimitExceeded')) {
          hasRateLimitError = true;
          console.warn('Google Books API quota exceeded. Will try fallback.');
          break;
        }
        continue;
      }
      
      if (data.items) {
        allBooks.push(...data.items);
      }
    } catch (error) {
      console.warn(`Failed to fetch books for query "${query}":`, error);
      continue;
    }
  }

  // If we got rate limited or no books, try Open Library fallback
  if (hasRateLimitError || allBooks.length === 0) {
    console.log('Attempting to fetch books from Open Library...');
    try {
      const fallbackBooks = await fetchFromOpenLibrary(limit);
      if (fallbackBooks.length > 0) {
        return fallbackBooks;
      }
    } catch (error) {
      console.error('Open Library fallback also failed:', error);
    }
    
    // If both APIs fail, throw error so UI can show empty state
    throw new Error("Books aren't available right now. Our book provider is temporarily unavailable.");
  }

  // Remove duplicates by title and limit to requested amount
  const uniqueBooks = Array.from(
    new Map(allBooks.map((book) => [book.volumeInfo.title, book])).values()
  ).slice(0, limit);

  return uniqueBooks.map(mapGoogleBookToProduct);
}

/**
 * Fetches a single book by id from Google Books API.
 * Note: id should be the Google Books volume ID (string), but we'll try to find by numeric ID.
 * Falls back to Open Library if Google Books fails.
 */
export async function fetchProductById(id: number): Promise<Product | null> {
  // Since we're using numeric IDs but Google Books uses string IDs,
  // we'll search and match. For a production app, you'd store the mapping.
  try {
    // Try a general search and find by matching our generated ID
    const res = await fetch(
      `${GOOGLE_BOOKS_BASE}?q=programming&maxResults=40`
    );
    
    // Check for 429 rate limit error
    if (res.status === 429) {
      console.warn('Google Books API quota exceeded. Trying Open Library fallback...');
      // Try Open Library fallback
      const fallbackRes = await fetch(
        `${OPEN_LIBRARY_BASE}?q=programming&limit=40&fields=key,title,author_name,first_publish_year,cover_i,cover_edition_key,first_sentence,subject`
      );
      if (fallbackRes.ok) {
        const fallbackData: OpenLibraryResponse = await fallbackRes.json();
        if (fallbackData.docs) {
          const book = fallbackData.docs.find((b) => {
            const numericId = Math.abs(
              b.key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
            );
            return numericId === id;
          });
          return book ? mapOpenLibraryToProduct(book) : null;
        }
      }
      return null;
    }
    
    if (!res.ok) return null;
    const data: GoogleBooksResponse = await res.json();
    
    // Check for error in response body
    if (data.error) {
      if (data.error.code === 429) {
        // Try Open Library fallback
        const fallbackRes = await fetch(
          `${OPEN_LIBRARY_BASE}?q=programming&limit=40&fields=key,title,author_name,first_publish_year,cover_i,cover_edition_key,first_sentence,subject`
        );
        if (fallbackRes.ok) {
          const fallbackData: OpenLibraryResponse = await fallbackRes.json();
          if (fallbackData.docs) {
            const book = fallbackData.docs.find((b) => {
              const numericId = Math.abs(
                b.key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
              );
              return numericId === id;
            });
            return book ? mapOpenLibraryToProduct(book) : null;
          }
        }
      }
      return null;
    }
    
    if (!data.items) return null;

    // Find book that matches our ID generation logic
    const book = data.items.find((b) => {
      const numericId = Math.abs(
        b.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      );
      return numericId === id;
    });

    return book ? mapGoogleBookToProduct(book) : null;
  } catch (error) {
    console.error('Failed to fetch book:', error);
    return null;
  }
}
