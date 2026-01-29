import type { Product } from '../types/product';

const GOOGLE_BOOKS_BASE = 'https://www.googleapis.com/books/v1/volumes';

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
 * Normalizes a Google Books volume to our app Product type.
 * Uses thumbnail image; generates mock price if API doesn't provide.
 */
function mapGoogleBookToProduct(raw: GoogleBookVolume): Product {
  const title = raw.volumeInfo.subtitle
    ? `${raw.volumeInfo.title}: ${raw.volumeInfo.subtitle}`
    : raw.volumeInfo.title;

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
    title,
    description,
    price,
    image,
  };
}

/**
 * Fetches books from Google Books API and returns normalized Product[].
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

  for (const query of queries) {
    if (allBooks.length >= limit) break;

    try {
      const res = await fetch(
        `${GOOGLE_BOOKS_BASE}?q=${encodeURIComponent(query)}&maxResults=${booksPerQuery}&orderBy=relevance`
      );
      if (!res.ok) continue;
      const data: GoogleBooksResponse = await res.json();
      if (data.items) {
        allBooks.push(...data.items);
      }
    } catch (error) {
      console.warn(`Failed to fetch books for query "${query}":`, error);
      continue;
    }
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
 */
export async function fetchProductById(id: number): Promise<Product | null> {
  // Since we're using numeric IDs but Google Books uses string IDs,
  // we'll search and match. For a production app, you'd store the mapping.
  try {
    // Try a general search and find by matching our generated ID
    const res = await fetch(
      `${GOOGLE_BOOKS_BASE}?q=programming&maxResults=40`
    );
    if (!res.ok) return null;
    const data: GoogleBooksResponse = await res.json();
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
