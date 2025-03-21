<script setup lang="ts">
import { ref } from 'vue'
import booksData from './data/books.json'
import type { Book } from './interfaces/Book'
import BookList from './components/BookList.vue'

const books = ref<Book[]>(booksData.books)
</script>

<template>
  <div id="app">
    <p class="title">Most Popular Books of All Time</p>
    <BookList :books="books" />
  </div>
</template>

<style scoped>
#app {
  padding: 2rem;
  font-family: Arial, sans-serif;
  background-color: whitesmoke;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #242424;
  margin: 1rem;
  display: flex;
  justify-content: start;
}
</style>
