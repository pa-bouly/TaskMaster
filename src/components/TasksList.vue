<script setup lang="ts">
import TaskCard from '@/components/TaskCard.vue'
import type { Task } from '@/stores/tasks'

defineProps<{
  tasks: Task[]
  useTeleport?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleTask', id: number): void
  (e: 'showTask', id: number): void
  (e: 'deleteTask', id: number): void
}>()

const onToogleEvent = (id: number) => {
  emit('toggleTask', id)
}

const onShowTask = (id: number) => {
  emit('showTask', id)
}

const onDeleteTask = (id: number) => {
  emit('deleteTask', id)
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <TransitionGroup name="list">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :use-teleport="useTeleport"
        @toggle-task="onToogleEvent"
        @show-task="onShowTask"
        @delete-task="onDeleteTask"
      />
    </TransitionGroup>

    <div
      v-if="tasks.length === 0"
      class="flex justify-center rounded border border-slate-100 bg-white p-3 font-light italic text-gray-500 shadow-sm"
    >
      No tasks found
    </div>
  </div>
</template>

<style lang="css" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
