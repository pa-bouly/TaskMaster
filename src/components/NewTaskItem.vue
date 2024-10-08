<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput } from 'element-plus'
import { type TaskToAdd } from '@/stores/tasks'
import DatePicker from '@/components/DatePicker.vue'

const emit = defineEmits<{
  (e: 'addTask', task: TaskToAdd): void
}>()

const showInput = ref(false)
const inputTitle = ref('')
const inputDescription = ref('')
const date = ref()

const onCancel = () => {
  showInput.value = false
  clearInputs()
}

const onSubmit = () => {
  if (!inputTitle.value) {
    return
  }

  emit('addTask', {
    title: inputTitle.value,
    description: inputDescription.value,
    dueDate: date.value
  })
  clearInputs()

  showInput.value = false
}

const clearInputs = () => {
  inputTitle.value = ''
  inputDescription.value = ''
  date.value = null
}
</script>

<template>
  <div>
    <div
      tabindex="0"
      class="flex min-h-16 cursor-pointer space-x-2 rounded border border-slate-100 bg-white p-2 shadow-sm transition hover:border-slate-400"
      @click="showInput = true"
      @keydown.enter="showInput = true"
      @keydown.escape="onCancel"
    >
      <Transition name="fade" mode="out-in">
        <div v-if="showInput" class="flex flex-1 flex-col">
          <el-input
            v-model="inputTitle"
            placeholder="Add a task"
            @keydown.enter="onSubmit"
            data-testid="task-title-input"
          />
          <el-input
            v-model="inputDescription"
            class="mt-2"
            size="small"
            placeholder="Description"
            @keydown.enter="onSubmit"
            data-testid="task-description-input"
          />

          <div class="mt-2 flex justify-between">
            <DatePicker v-model="date" size="small" @keydown.enter="onSubmit" />

            <div class="flex items-center">
              <el-button size="small" @click.stop="onCancel">Cancel</el-button>
              <el-button
                size="small"
                type="primary"
                :disabled="!inputTitle"
                @click="onSubmit"
                data-testid="add-task-button"
              >
                Add
              </el-button>
            </div>
          </div>
        </div>
        <div
          v-else
          class="flex items-center justify-center space-x-2 font-light text-gray-500"
          data-testid="open-form-button"
        >
          <el-icon><Plus /></el-icon>
          <span> Add a new task </span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
