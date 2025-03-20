<script setup lang="ts">
import { ref } from 'vue'
import BookList from './components/BookList.vue'
import booksData from './data/books.json'
import type { Book } from './interfaces/Book'

// Si le fichier JSON a la structure { "books": [...] }, on extrait le tableau
const books = ref<Book[]>(booksData.books)
</script>

<template>
  <div id="app">
    <h1>Mes Livres Populaires</h1>
    <BookList :books="books" />
  </div>
</template>

<style scoped>
#app {
  padding: 2rem;
  font-family: Arial, sans-serif;
}
</style>
