<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import TasksList from '@/components/TasksList.vue'
import { ElButton } from 'element-plus'

const store = useTasksStore()

const onAddTask = () => {
  store.addTask('new task')
}

console.log('store.tasks', store.tasks)
</script>

<template>
  <main class="">
    <div class="container mx-auto py-4 px-2 mt-2">
      <h1 class="text-xl font-bold">Tasks</h1>
      <p>{{ store.tasks.length }} tasks</p>

      <el-button type="primary" @click="onAddTask">Add task</el-button>

      <TasksList :tasks="store.tasks" />
    </div>
  </main>
</template>
