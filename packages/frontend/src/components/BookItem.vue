<template>
    <div class="book-item">
      <h3>{{ book.title }}</h3>
      <p><strong>Author:</strong> {{ book.author }}</p>
      <button class="toggle-details" @click="showDetails = !showDetails">
        {{ showDetails ? 'Hide Details' : 'Show Details' }}
      </button>
      <p v-if="showDetails">{{ book.description }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue'
  import type { Book } from '../interfaces/Book'
  
  defineProps<{
    book: Book
  }>()
  
  const showDetails = ref(false)

  </script>
  
  <style scoped>
  .book-item {
    display: flex;
    border: 1px solid gainsboro;
    padding: 1em;
    margin: 0.5em 0;
    flex-direction: column;
    align-items: center;
  }
  .toggle-details {
    margin: 0.5em 0;
  }
  </style>
  