<template>
    <div class="pagination">
      <button
        class="pagination-btn"
        @click="$emit('page-changed', currentPage - 1)"
        :disabled="currentPage === 1"
      >
        &lt;
      </button>
      <span class="pagination-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        class="pagination-btn"
        @click="$emit('page-changed', currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        &gt;
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  interface PaginationProps {
    currentPage: number;
    totalPages: number;
  }
  
  const props = defineProps<PaginationProps>()
  </script>
  
  <style scoped>
  .pagination {
    color: black;
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  .pagination-btn {
    border: none;
    background: transparent;
    font-size: 1.2rem;
    cursor: pointer;
    color: grey
  }
  
  .pagination-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .pagination-info {
    font-weight: 500;
  }
  </style>
  