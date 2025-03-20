import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookItem from '../../src/components/BookItem.vue'

describe('BookItem.vue', () => {
  const book = {
    id: 1,
    title: 'Test Book',
    author: 'Author Name',
    description: 'Detailed description of the test book.',
    cover: '01.jpg'
  }

  it('renders the cover image with the correct src', () => {
    const wrapper = mount(BookItem, { props: { book } })
    // We expect an balise img who show the cover of the book
    const img = wrapper.find('img.cover')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toContain('/assets/images/')
    expect(img.attributes('src')).toContain(book.cover)
  })

  it('toggles description on click', async () => {
    const wrapper = mount(BookItem, { props: { book } })
    await wrapper.find('button.toggle-details').trigger('click')
    expect(wrapper.text()).toContain(book.description)
  })
})
