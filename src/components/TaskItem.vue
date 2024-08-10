<script setup lang="ts">
import type { Task } from '@/stores/tasks'

defineProps<{
  task: Task
}>()
</script>

<template>
  <div class="border p-2">
    <h2>Task id: {{ task.id }}</h2>
    <p>{{ task.title }}</p>

    <p>{{ task.description }}</p>
  </div>
</template>
