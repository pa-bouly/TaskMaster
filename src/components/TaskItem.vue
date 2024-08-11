<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '@/stores/tasks'
import { ElCheckbox, ElPopconfirm } from 'element-plus'
import { useDateFormat } from '@vueuse/core'
import { Delete } from '@element-plus/icons-vue'
const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'toggleTask', id: number): void
  (e: 'showTask', id: number): void
  (e: 'deleteTask', id: number): void
}>()

watch(
  () => props.task.isCompleted,
  () => {
    isTaskCompleted.value = props.task.isCompleted
  }
)

watch(
  () => props.task.dueDate,
  () => {
    formattedDueDate.value = props.task.dueDate
      ? useDateFormat(props.task.dueDate, 'YYYY-MM-DD').value
      : ''
  }
)

const isTaskCompleted = ref(props.task.isCompleted)

const formattedDueDate = ref(
  props.task.dueDate ? useDateFormat(props.task.dueDate, 'YYYY-MM-DD').value : ''
)
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

    <div class="flex flex-1 flex-col">
      <div class="font-light">{{ task.title }}</div>
      <div class="text-sm font-light text-gray-500">{{ task.description }}</div>

      <div>{{ formattedDueDate }}</div>
    </div>

    <div class="flex items-center">
      <el-popconfirm title="Are you sure to delete this?" @confirm="emit('deleteTask', task.id)">
        <template #reference>
          <el-button :icon="Delete" circle @click.stop />
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>
