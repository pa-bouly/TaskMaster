<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '@/stores/tasks'
import { ElCheckbox } from 'element-plus'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'toggleTask', id: number): void
}>()

const isTaskCompleted = ref(props.task.isCompleted)
</script>

<template>
  <div
    class="border border-slate-100 rounded shadow-sm p-2 bg-white flex space-x-2 hover:border-slate-400 transition cursor-pointer"
  >
    <div>
      <el-checkbox
        v-model="isTaskCompleted"
        size="large"
        @change="() => emit('toggleTask', task.id)"
      />
    </div>

    <div class="flex flex-col">
      <div class="font-light">{{ task.title }}</div>
      <div class="text-sm text-gray-500 font-light">{{ task.description }}</div>

      <div>{{ task.dueDate }}</div>
    </div>
  </div>
</template>
