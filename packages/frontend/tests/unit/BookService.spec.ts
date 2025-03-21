import { fetchBooks } from '../../src/services/BookService';
import booksData from '../../src/data/books.json';
import { describe, it, expect } from 'vitest'

describe('bookService', () => {
  it('fetchBooks should return books from local data', async () => {
    const books = await fetchBooks();
    expect(books).toEqual(booksData.books);
  });
});