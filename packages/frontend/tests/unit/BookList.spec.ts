import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookList from '../../src/components/BookList.vue'

describe('BookList.vue', () => {
  it('renders a list of books using BookItem component', () => {
    const books = [
      { id: 1, title: 'Book 1', author: 'Author 1', description: 'Desc 1', cover: '01.jpg', rating: '9.9' },
      { id: 2, title: 'Book 2', author: 'Author 2', description: 'Desc 2', cover: '02.jpg', rating: '9.8' },
      { id: 3, title: 'Book 3', author: 'Author 3', description: 'Desc 3', cover: '03.jpg', rating: '9.6' },
    ]
    const wrapper = mount(BookList, { props: { books } })
    const rows = wrapper.findAllComponents({ name: 'BookItem' })
    expect(rows.length).toBe(books.length)
  })
});