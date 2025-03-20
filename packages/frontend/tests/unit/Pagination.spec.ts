import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../../src/components/Pagination.vue'

describe('Pagination.vue', () => {
  it('renders correct number of page buttons', () => {
    const totalItems = 12
    const perPage = 5
    const wrapper = mount(Pagination, {
      props: { totalItems, perPage }
    })
    // With 12 items and 5 per page, we should have 3 pages
    const buttons = wrapper.findAll('button.page-btn')
    expect(buttons.length).toBe(3)
  })

  it('emits an event when a page is selected', async () => {
    const totalItems = 12
    const perPage = 5
    const wrapper = mount(Pagination, {
      props: { totalItems, perPage }
    })

    const buttons = wrapper.findAll('button.page-btn')
    await buttons[1].trigger('click') // simuler le clic sur la page 2
    expect(wrapper.emitted('page-changed')).toBeTruthy()
    expect(wrapper.emitted('page-changed')?.[0]).toEqual([2])
  })
})
