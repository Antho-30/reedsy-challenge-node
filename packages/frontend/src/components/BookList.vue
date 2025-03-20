<template>
    <div>
      <ul v-if="books && books.length">
        <li v-for="book in books" :key="book.id">
          {{ book.title }}
        </li>
      </ul>
      <p v-else>No books available</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  books: { id: number; title: string }[];
}>();
</script>

<style scoped>
/* Ajoute ici du style si nécessaire */
</style>
  