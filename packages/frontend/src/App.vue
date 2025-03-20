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
  { id: 6, title: 'Book 6', author: 'Author 6', description: 'Detailed description of Book 6.' },
  { id: 7, title: 'Book 7', author: 'Author 7', description: 'Detailed description of Book 7.' },
  { id: 8, title: 'Book 8', author: 'Author 8', description: 'Detailed description of Book 8.' },
  { id: 9, title: 'Book 9', author: 'Author 9', description: 'Detailed description of Book 9.' },
  { id: 10, title: 'Book 10', author: 'Author 10', description: 'Detailed description of Book 10.' },
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
