import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Task {
  id: number
  title: string
  description?: string
  dueDate?: Date
  isCompleted: boolean
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  const addTask = (title: string) => {
    tasks.value.push({
      id: tasks.value.length + 1,
      title,
      isCompleted: false
    })
  }

  const removeTask = (id: number) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    tasks.value.splice(index, 1)
  }

  const completedTasks = computed(() => {
    return tasks.value.filter((task) => task.isCompleted)
  })

  return {
    tasks,
    addTask,
    removeTask,
    completedTasks
  }
})
