<template>
    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        class="page-btn"
        @click="$emit('page-changed', page)"
      >
        {{ page }}
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, defineProps } from 'vue'
  
  interface Props {
    totalItems: number;
    perPage: number;
  }
  
  const props = defineProps<Props>()
  
  const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage))
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    gap: 0.5rem;
  }
  .page-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
  }
  </style>
  