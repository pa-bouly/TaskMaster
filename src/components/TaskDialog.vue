<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '@/stores/tasks'
import { ElButton, ElCheckbox, ElInput, ElDialog } from 'element-plus'
import { useTasksStore } from '@/stores/tasks'
import { useWindowSize } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import DatePicker from '@/components/DatePicker.vue'

const store = useTasksStore()
const { width: windowWidth } = useWindowSize()

watch(
  () => store.taskToEdit,
  () => {
    currentTask.value = store.taskToEdit ? { ...store.taskToEdit } : null
  }
)

const currentTask = ref<Task | null>(store.taskToEdit ? { ...store.taskToEdit } : null)

const onCancelClick = () => {
  currentTask.value = store.taskToEdit ? { ...store.taskToEdit } : null
}

const onSaveClick = () => {
  if (currentTask.value) {
    store.updateTask({ ...currentTask.value })

    ElMessage({
      message: 'Task updated.',
      type: 'success',
      plain: true
    })

    store.hideTask()
  }
}
</script>

<template>
  <el-dialog
    :model-value="store.isTaskDialogVisible"
    :width="windowWidth < 768 ? '95%' : '50%'"
    title="Task details"
    @close="store.hideTask"
  >
    <div>
      <div v-if="currentTask" class="flex space-x-2">
        <el-checkbox v-model="currentTask.isCompleted" size="large" />

        <div class="flex flex-1 flex-col space-y-2">
          <div class="max-w-screen-sm">
            <el-input v-model="currentTask.title" />
          </div>

          <div class="max-w-screen-sm">
            <el-input
              v-model="currentTask.description"
              type="textarea"
              :autosize="{ minRows: 2 }"
              placeholder="Task description"
            />
          </div>

          <date-picker v-model="currentTask.dueDate" />

          <div class="mt-4 flex justify-between">
            <el-button @click="onCancelClick">Cancel</el-button>
            <el-button :disabled="!currentTask.title" type="primary" @click="onSaveClick">
              Save
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
