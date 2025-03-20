<template>
  <div>
    <ul v-if="books && books.length">
      <li v-for="book in books" :key="book.id">
        <!-- Use of bookItems component -->
        <BookItem :book="book" />
      </li>
    </ul>
    <p v-else>No books available</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import BookItem from './BookItem.vue'

defineProps<{
  books: Array<{ id: number, title: string, author: string, description: string }>
}>()
</script>

<style scoped>
</style>
