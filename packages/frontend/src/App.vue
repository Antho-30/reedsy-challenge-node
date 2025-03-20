<script setup lang="ts">
import { ref } from 'vue'
import BookList from './components/BookList.vue'

// Exemple de données pour les livres
const books = ref([
  { id: 1, title: 'Book 1' },
  { id: 2, title: 'Book 2' },
  { id: 3, title: 'Book 3' },
  { id: 4, title: 'Book 4' },
  { id: 5, title: 'Book 5' },
  { id: 6, title: 'Book 6' }
])
</script>

<template>
  <h1>My Book List</h1>
  <!-- Appel du composant BookList avec la prop books -->
  <BookList :books="books" />

  <p>
    This is an example SPA using Vue.js and Vite.
  </p>
</template>

<style scoped>
/* Tes styles ici */
</style>
