import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookItem from '../../src/components/BookItem.vue'

describe('BookItem.vue', () => {
  const book = {
    id: 1,
    title: 'Test Book',
    author: 'Author Name',
    description: 'This is a detailed description of the book.'
  }

  it('renders the book title and hides details by default', () => {
    const wrapper = mount(BookItem, {
      props: { book }
    })
    expect(wrapper.text()).toContain(book.title)
    expect(wrapper.text()).not.toContain(book.description)
  })

  it('toggles details when clicked', async () => {
    const wrapper = mount(BookItem, {
      props: { book }
    })
    await wrapper.find('button.toggle-details').trigger('click')
    expect(wrapper.text()).toContain(book.description)
    await wrapper.find('button.toggle-details').trigger('click')
    expect(wrapper.text()).not.toContain(book.description)
  })
})
