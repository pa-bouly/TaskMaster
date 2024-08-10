<script setup lang="ts">
import { useTasksStore, type Task } from '@/stores/tasks'
import TasksList from '@/components/TasksList.vue'
import TaskDialog from '@/components/TaskDialog.vue'
import NewTaskItem from '@/components/NewTaskItem.vue'

const store = useTasksStore()

const onAddTask = (task: Omit<Task, 'id' | 'isCompleted'>) => {
  store.addTask(task)
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
      <div class="mb-2 flex items-center justify-between">
        <div>{{ store.tasks.length }} tasks</div>

        <div>{{ store.completedTasks.length }} completed task(s)</div>
      </div>

      <NewTaskItem class="mb-2" @add-task="onAddTask" />

      <TasksList :tasks="store.tasks" @toggle-task="onToggleEvent" @show-task="onShowTask" />
    </div>

    <TaskDialog />
  </main>
</template>
