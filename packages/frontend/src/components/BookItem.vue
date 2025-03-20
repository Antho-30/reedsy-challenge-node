<template>
  <div class="book-item">
    <img class="cover" :src="coverUrl" alt="Book Cover" />
    <h3>{{ book.title }}</h3>
    <p><strong>Author:</strong> {{ book.author }}</p>
    <button class="toggle-details" @click="showDetails = !showDetails">
      {{ showDetails ? 'Hide Details' : 'Show Details' }}
    </button>
    <p v-if="showDetails">{{ book.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'
import type { Book } from '../interfaces/Book'
const props = defineProps<{ book: Book }>()

const showDetails = ref(false)


const coverUrl = computed(() => {
  return new URL(`../assets/images/${props.book.cover}`, import.meta.url).href
})
</script>

<style scoped>
.book-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}
.cover {
  width: 100px;
  height: auto;
  object-fit: cover;
}
.toggle-details {
  margin: 0.5rem 0;
}
</style>
