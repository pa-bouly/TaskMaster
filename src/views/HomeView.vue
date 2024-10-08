<script setup lang="ts">
import { useTasksStore, type TaskToAdd } from '@/stores/tasks'
import PageHeader from '@/components/PageHeader.vue'
import TasksList from '@/components/TasksList.vue'
import TaskDialog from '@/components/TaskDialog.vue'
import NewTaskItem from '@/components/NewTaskItem.vue'
import FilterButton from '@/components/FilterButton.vue'

const store = useTasksStore()

const onAddTask = (task: TaskToAdd) => {
  store.addTask(task)
}

const onToggleEvent = (id: number) => {
  store.toggleTask(id)
}

const onShowTask = (id: number) => {
  store.showTask(id)
}

const onDeleteTask = (id: number) => {
  store.deleteTask(id)
}

const onSearchTask = (query: string) => {
  store.searchTask(query)
}
</script>

<template>
  <div>
    <PageHeader @search="onSearchTask" />
    <main>
      <div class="container mx-auto mt-2 px-2 py-4">
        <div class="mb-2 flex items-center justify-between">
          <div>
            <Transition name="counter" mode="out-in">
              <span :key="store.tasks.length"> {{ store.tasks.length }} </span>
            </Transition>
            <span> tasks / </span>

            <Transition name="counter" mode="out-in">
              <span :key="store.completedTasks.length">
                {{ store.completedTasks.length }}
              </span>
            </Transition>
            <span>
              {{ store.completedTasks.length > 1 ? ' completed tasks' : ' completed task' }}
            </span>
          </div>

          <div>
            <FilterButton />
          </div>
        </div>

        <NewTaskItem class="mb-2" @add-task="onAddTask" />

        <TasksList
          :tasks="store.filteredAndSortedTasks"
          @toggle-task="onToggleEvent"
          @show-task="onShowTask"
          @delete-task="onDeleteTask"
        />
      </div>

      <TaskDialog />
    </main>
  </div>
</template>

<style scoped>
.counter-enter-active,
.counter-leave-active {
  transition: opacity 0.1s ease;
}

.counter-enter-from,
.counter-leave-to {
  opacity: 0;
}
</style>
