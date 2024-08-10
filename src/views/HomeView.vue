<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import { ElButton } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import TasksList from '@/components/TasksList.vue'
import TaskDialog from '@/components/TaskDialog.vue'

const store = useTasksStore()

const onAddTask = () => {
  store.addTask('new task')
}

const onToggleEvent = (id: number) => {
  store.toggleTask(id)
}

const onShowTask = (id: number) => {
  store.showTask(id)
}
</script>

<template>
  <main>
    <div class="container mx-auto mt-2 px-2 py-4">
      <div class="flex items-center justify-between">
        <div>{{ store.tasks.length }} tasks</div>

        <div>{{ store.completedTasks.length }} completed task(s)</div>
      </div>

      <el-button pre @click="onAddTask" :icon="Plus" class="my-2">Add task</el-button>

      <TasksList :tasks="store.tasks" @toggle-task="onToggleEvent" @show-task="onShowTask" />
    </div>

    <TaskDialog />
  </main>
</template>
