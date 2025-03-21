import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookItem from '../../src/components/BookItem.vue'
import type { Book } from '../../src/interfaces/Book'

describe('BookItem.vue', () => {
  const book: Book = {
    id: 1,
    title: 'In Search of Lost Time',
    author: 'Marcel Proust',
    description: 'Detailed description...',
    cover: '01.jpg',
    rating: '9.9/10',
    published: 1913,
    buy: {
      amazon: 'https://www.amazon.com/search-of-lost-time',
      iBooks: 'https://www.apple.com/ibooks/in-search-of-lost-time',
      playStore: 'https://play.google.com/store/books/details?id=in_search_of_lost_time'
    }
  }

  it('displays published year, rating, and buy links', () => {
    const wrapper = mount(BookItem, { props: { book } })
    expect(wrapper.text()).toContain(1913)
    expect(wrapper.text()).toContain('9.9/10')
    const links = wrapper.findAll('a.buy-link')
    expect(links.length).toBe(3)
    expect(links[0].attributes('href')).toBe(book.buy.amazon)
    expect(links[1].attributes('href')).toBe(book.buy.iBooks)
    expect(links[2].attributes('href')).toBe(book.buy.playStore)
  })
})
