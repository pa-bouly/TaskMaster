<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/stores/tasks'

defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  (e: 'toggleTask', id: number): void
}>()

const onToogleEvent = (id: number) => {
  emit('toggleTask', id)
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <TransitionGroup name="list">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @toggle-task="onToogleEvent" />
    </TransitionGroup>
  </div>
</template>

<style lang="css" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
