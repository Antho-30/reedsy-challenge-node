import type { Book } from '../interfaces/Book';
import booksData from '../data/books.json';

export const fetchBooks = async (): Promise<Book[]> => {
  // Simulate network request
  return new Promise((resolve) => {
    setTimeout(() => resolve(booksData.books), 1000); 
  });
};