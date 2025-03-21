<template>
  <div>
    <div class="header">
      <span class="header-title">Title</span>
      <span class="header-published">Published</span>
      <span class="header-rating">Rating</span>
      <span class="header-buy-on">Buy On</span>
    </div>

    <div v-if="isLoading">Loading books...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="paginatedBooks.length">
        <BookItem v-for="book in paginatedBooks" :key="book.id" :book="book" />
      </div>
      <p v-else>No books available</p>
    </div>

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import BookItem from './BookItem.vue';
import Pagination from './Pagination.vue';
import { fetchBooks } from '../services/BookService';
import type { Book } from '../interfaces/Book';

const books = ref<Book[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Pagination
const perPage = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(books.value.length / perPage));

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return books.value.slice(start, start + perPage);
});

const loadBooks = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    books.value = await fetchBooks();
  } catch (err) {
    error.value = 'Failed to load books. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

onMounted(() => {
  loadBooks();
});

</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 1px 3fr 1fr 1fr 1fr;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  font-weight: bold;
  color: #6c757d;
  text-transform: uppercase;
}

.header-published {
  grid-column: 3 / 4;
  text-align: center;
}

.header-rating {
  grid-column: 4 / 5;
  text-align: center;
}

.header-buy-on {
  grid-column: 5 / 6;
  text-align: center;
}

</style>
