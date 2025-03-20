<script setup lang="ts">
import { ref } from 'vue'
import BookList from './components/BookList.vue'

// Exemple de données pour les livres
const books = ref([
  { id: 1, title: 'Book 1', author: 'Author 1', description: 'Detailed description of Book 1.' },
  { id: 2, title: 'Book 2', author: 'Author 2', description: 'Detailed description of Book 2.' },
  { id: 3, title: 'Book 3', author: 'Author 3', description: 'Detailed description of Book 3.' },
  { id: 4, title: 'Book 4', author: 'Author 4', description: 'Detailed description of Book 4.' },
  { id: 5, title: 'Book 5', author: 'Author 5', description: 'Detailed description of Book 5.' },
  { id: 6, title: 'Book 6', author: 'Author 6', description: 'Detailed description of Book 6.' }
])
</script>

<template>
  <div id="app">
    <h1>My Book List</h1>
    <BookList :books="books" />
  </div>
</template>

<style scoped>
#app {
  padding: 2rem;
  font-family: Arial, sans-serif;
}
</style>
