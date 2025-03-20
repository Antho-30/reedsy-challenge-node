import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../../src/components/Pagination.vue'

describe('Pagination.vue', () => {
  it('renders two pagination buttons and displays current page info', () => {
    const currentPage = 1
    const totalPages = 3
    const wrapper = mount(Pagination, {
      props: { currentPage, totalPages }
    })

    const buttons = wrapper.findAll('button.pagination-btn')
    expect(buttons.length).toBe(2) // Previous and Next buttons

    const infoText = wrapper.find('span.pagination-info').text()
    expect(infoText).toContain(`Page ${currentPage} of ${totalPages}`)
  })

  it('emits page-changed event when next button is clicked', async () => {
    const currentPage = 1
    const totalPages = 3
    const wrapper = mount(Pagination, {
      props: { currentPage, totalPages }
    })

    const buttons = wrapper.findAll('button.pagination-btn')
    const nextButton = buttons[1]
    await nextButton.trigger('click')
    expect(wrapper.emitted('page-changed')).toBeTruthy()
    expect(wrapper.emitted('page-changed')?.[0]).toEqual([currentPage + 1])
  })

  it('emits page-changed event when previous button is clicked', async () => {
    const currentPage = 2
    const totalPages = 3
    const wrapper = mount(Pagination, {
      props: { currentPage, totalPages }
    })

    const buttons = wrapper.findAll('button.pagination-btn')
    const prevButton = buttons[0]
    await prevButton.trigger('click')
    expect(wrapper.emitted('page-changed')).toBeTruthy()
    expect(wrapper.emitted('page-changed')?.[0]).toEqual([currentPage - 1])
  })

  it('disables the previous button on first page and next button on last page', async () => {
    const wrapperFirst = mount(Pagination, {
      props: { currentPage: 1, totalPages: 3 }
    })
    const wrapperLast = mount(Pagination, {
      props: { currentPage: 3, totalPages: 3 }
    })

    const firstButtons = wrapperFirst.findAll('button.pagination-btn')
    const lastButtons = wrapperLast.findAll('button.pagination-btn')

    expect(firstButtons[0].attributes('disabled')).toBeDefined() 
    expect(lastButtons[1].attributes('disabled')).toBeDefined()
  })
})
