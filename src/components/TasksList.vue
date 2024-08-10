<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/stores/tasks'

defineProps<{
  tasks: Task[]
}>()
</script>

<template>
  <div class="flex flex-col space-y-2">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>
