<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '@/stores/tasks'
import { ElCheckbox } from 'element-plus'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'toggleTask', id: number): void
  (e: 'showTask', id: number): void
}>()

watch(
  () => props.task.isCompleted,
  () => {
    isTaskCompleted.value = props.task.isCompleted
  }
)

const isTaskCompleted = ref(props.task.isCompleted)
</script>

<template>
  <div
    class="flex cursor-pointer space-x-2 rounded border border-slate-100 bg-white p-2 shadow-sm transition hover:border-slate-400"
    @click="() => emit('showTask', task.id)"
  >
    <el-checkbox
      v-model="isTaskCompleted"
      size="large"
      @change="() => emit('toggleTask', task.id)"
      @click.stop
    />

    <div class="flex flex-col">
      <div class="font-light">{{ task.title }}</div>
      <div class="text-sm font-light text-gray-500">{{ task.description }}</div>

      <div>{{ task.dueDate }}</div>
    </div>
  </div>
</template>
