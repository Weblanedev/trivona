import lean from "./assets/the lean stup.webp";
import influence from "./assets/influence.png";
import hooked from "./assets/Hooked-updated-cover-US.webp";
import phoenix from "./assets/the phoenix project.jpeg";
import digital from "./assets/Digital-Marketing-for-Dummies-book-cover.jpg";

export const genres = [
  {
    id: 1,
    name: "Business/Entrepreneurship",
  },
  {
    id: 2,
    name: "Psychology/Sales",
  },
  {
    id: 3,
    name: "Business/Marketing",
  },
  {
    id: 4,
    name: "Business/Technology",
  },
  {
    id: 5,
    name: "Marketing/Technology",
  },
];

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  img: string;
  price: string;
  summary: string;
}

export const books = [
  {
    id: 1,
    title:
      "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses",
    author: "Eric Ries",
    genre: "Business/Entrepreneurship",
    img: lean,
    price: "$65.99",
    summary:
      "This book presents a methodology for developing businesses and products based on the concept of validated learning, experimentation, and iterative product releases.",
  },
  {
    id: 2,
    title: "Influence: The Psychology of Persuasion",
    author: "Robert B. Cialdini",
    genre: "Psychology/Sales",
    img: influence,

    price: "$72.50",
    summary:
      "This book explores the psychology behind why people say 'yes' and how to apply these understandings in marketing, sales, and everyday life.",
  },
  {
    id: 3,
    title: "Hooked: How to Build Habit-Forming Products",
    author: "Nir Eyal",
    genre: "Business/Marketing",
    img: hooked,

    price: "$80.99",
    summary:
      "This book provides insights into the psychology of habit-forming products and offers practical advice for creating products that users can't put down.",
  },
  {
    id: 4,
    title:
      "The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win",
    author: "Gene Kim, Kevin Behr, George Spafford",
    genre: "Business/Technology",
    img: phoenix,

    price: "$97.25",
    summary:
      "This novel tells the story of an IT manager's journey to save his company's failing IT infrastructure by applying principles of DevOps.",
  },
  {
    id: 5,
    title: "Digital Marketing for Dummies",
    author: "Ryan Deiss, Russ Henneberry",
    genre: "Marketing/Technology",
    img: digital,

    price: "$84.99",
    summary:
      "This book offers comprehensive guidance on digital marketing strategies, including SEO, content marketing, social media, email marketing, and more.",
  },
];
