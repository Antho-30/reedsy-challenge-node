import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BookList from '../../src/components/BookList.vue'

describe('BookList.vue', () => {
  it('renders without errors', () => {
    const wrapper = shallowMount(BookList, {
      props: { books: [] }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
