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
  const taskToEdit = ref<Task | null>(null)

  const completedTasks = computed(() => {
    return tasks.value.filter((task) => task.isCompleted)
  })

  const isTaskDialogVisible = computed(() => {
    return taskToEdit.value !== null
  })

  const addTask = (newTask: Omit<Task, 'id' | 'isCompleted'>) => {
    tasks.value.unshift({
      id: tasks.value.length + 1,
      isCompleted: false,
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate
    })
  }

  const toggleTask = (id: number) => {
    const task = tasks.value.find((task) => task.id === id)

    if (!task) return

    task.isCompleted = !task.isCompleted
  }

  const showTask = (id: number) => {
    taskToEdit.value = tasks.value.find((task) => task.id === id) || null
  }

  const hideTask = () => {
    taskToEdit.value = null
  }

  const updateTask = (task: Task) => {
    const index = tasks.value.findIndex((t) => t.id === task.id)
    tasks.value.splice(index, 1, task)
    taskToEdit.value = task
  }

  const removeTask = (id: number) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    tasks.value.splice(index, 1)
  }

  return {
    tasks,
    taskToEdit,
    completedTasks,
    isTaskDialogVisible,
    addTask,
    toggleTask,
    showTask,
    hideTask,
    updateTask,
    removeTask
  }
})
