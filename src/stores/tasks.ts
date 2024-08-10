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
    tasks.value.unshift({
      id: tasks.value.length + 1,
      title,
      description: 'aaaa',
      isCompleted: false
    })
  }

  const completedTasks = computed(() => {
    return tasks.value.filter((task) => task.isCompleted)
  })

  const toggleTask = (id: number) => {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.isCompleted = !task.isCompleted
    }
  }

  const removeTask = (id: number) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    tasks.value.splice(index, 1)
  }

  return {
    tasks,
    completedTasks,
    addTask,
    toggleTask,
    removeTask
  }
})
