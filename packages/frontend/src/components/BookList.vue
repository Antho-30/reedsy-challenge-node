<template>
  <div>
    <div v-if="paginatedBooks.length">
          <BookItem v-for="book in paginatedBooks" :key="book.id" :book="book" />
    </div>
    <p v-else>No books available</p>
    <Pagination :totalItems="books.length" 
                :perPage="perPage" 
                @page-changed="handlePageChange" 
    />
  </div>  
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import BookItem from './BookItem.vue'
import Pagination from './Pagination.vue';
import type { Book } from '../interfaces/Book';

const props = defineProps<{books: Book[]  }>()

// Number of books per page fixed to 5
const perPage = 5
const currentPage = ref(1)

// Calculate the list of books to display on the current page
const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return props.books.slice(start, start + perPage)
})

// Update the current page when the user clicks on a page number
function handlePageChange(page: number) {
  currentPage.value = page
}
</script>

<style scoped>
</style>
