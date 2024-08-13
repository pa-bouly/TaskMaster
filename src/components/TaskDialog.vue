<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '@/stores/tasks'
import { ElButton, ElInput, ElDialog } from 'element-plus'
import { useTasksStore } from '@/stores/tasks'
import { useWindowSize } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import DatePicker from '@/components/DatePicker.vue'
import CheckboxRounded from '@/components/CheckboxRounded.vue'

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
  currentTask.value = store.taskToEdit?.id ? { ...store.taskToEdit } : null
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
        <CheckboxRounded
          v-model="currentTask.isCompleted"
          aria-label="checkbox-task"
          role="checkbox"
        />

        <div class="flex flex-1 flex-col space-y-2">
          <div class="max-w-screen-sm">
            <el-input
              v-model="currentTask.title"
              placeholder="title"
              data-testid="task-title-input"
            />
          </div>

          <div class="max-w-screen-sm">
            <el-input
              v-model="currentTask.description"
              type="textarea"
              :autosize="{ minRows: 2 }"
              placeholder="Task description"
              data-testid="task-description-input"
            />
          </div>

          <DatePicker v-model="currentTask.dueDate" />

          <div class="mt-4 flex justify-between">
            <el-button @click="onCancelClick" data-testid="cancel-task-button">Cancel</el-button>
            <el-button
              :disabled="!currentTask.title"
              type="primary"
              @click="onSaveClick"
              data-testid="save-task-button"
            >
              Save
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
