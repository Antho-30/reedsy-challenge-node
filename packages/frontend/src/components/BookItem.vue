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
  
  interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
  }
  
  defineProps<{
    book: Book
  }>()
  
  const showDetails = ref(false)

  </script>
  
  <style scoped>
  .book-item {
    border: 1px solid #ccc;
    padding: 1em;
    margin: 0.5em 0;
  }
  .toggle-details {
    margin: 0.5em 0;
  }
  </style>
  