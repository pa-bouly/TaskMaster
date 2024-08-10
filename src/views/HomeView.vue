<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import TasksList from '@/components/TasksList.vue'
import { ElButton } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const store = useTasksStore()

const onAddTask = () => {
  store.addTask('new task')
}

const onToggleEvent = (id: number) => {
  store.toggleTask(id)
}
</script>

<template>
  <main>
    <div class="container mx-auto py-4 px-2 mt-2">
      <div class="flex justify-between items-center">
        <div>{{ store.tasks.length }} tasks</div>

        <div>{{ store.completedTasks.length }} completed tasks</div>
      </div>

      <el-button pre @click="onAddTask" :icon="Plus" class="my-2">Add task</el-button>

      <TasksList :tasks="store.tasks" @toggle-task="onToggleEvent" />
    </div>
  </main>
</template>
