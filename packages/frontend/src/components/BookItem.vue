<template>
  <div class="book-list">
    <div class="book-item">
      <img
        class="cover"
        :src="coverUrl"
        alt="Book Cover"
        @click="showDetails = !showDetails"
      />
      <div class="info">
        <h3 class="title">{{ book.title }}</h3>
        <p class="author">{{ book.author }}</p>
      </div>
      <p class="published">{{ book.published }}</p>
      <p class="rating">{{ book.rating }}</p>
      <div class="buy-links">
        <a class="buy-link" :href="book.buy.amazon" target="_blank">Amazon</a>
        <a class="buy-link" :href="book.buy.iBooks" target="_blank">iBooks</a>
        <a class="buy-link" :href="book.buy.playStore" target="_blank">Play Store</a>
      </div>
      <p class="description" v-if="showDetails">{{ book.description }}</p>
    </div>
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
.book-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.book-item {
  display: grid;
  grid-template-columns: 100px 2fr 1fr 1fr 1fr;
  align-items: start;
  padding: 1rem;
  gap: 1rem;
}

.cover {
  width: 80px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.cover:hover {
  transform: scale(1.05);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: flex-start;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #242424;
  margin: 0;
}

.author {
  font-size: 0.9rem;
  color: grey;
  margin: 0;
}

.published,
.rating {
  font-size: 0.9rem;
  color: #242424;
  text-align: center;
}

.buy-links {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.buy-link {
  font-size: 0.9rem;
  color: greenyellow;
  text-decoration: none;
}

.buy-link:hover {
  text-decoration: underline;
  color: steelblue
}

.buy-link:visited {
  color: blueviolet;
}

.description {
  grid-column: 2 / span 4;
  font-size: 0.9rem;
  color: #242424;
  margin-top: 0.5rem;
  line-height: 1.5;
}
</style>