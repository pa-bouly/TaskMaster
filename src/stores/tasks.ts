import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export interface Task {
  id: number
  title: string
  description?: string
  dueDate?: Date
  isCompleted: boolean
}

export type TaskToAdd = Omit<Task, 'id' | 'isCompleted'>

export enum SortBy {
  dueDate = 'dueDate',
  title = 'title'
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}

export enum FilterBy {
  date = 'date'
}

interface Filter {
  isCompleted: boolean
  sortBy?: SortBy | null
  sortDirection?: SortDirection
  filterByDate?: Date | null
}

export const useTasksStore = defineStore(
  'tasks',
  () => {
    const tasks = ref<Task[]>([])
    const taskToEdit = ref<Task | null>(null)
    const filter = ref<Filter>({
      isCompleted: true,
      sortBy: undefined,
      sortDirection: undefined,
      filterByDate: undefined
    })
    const searchInput = ref('')

    const completedTasks = computed(() => {
      return tasks.value.filter((task) => task.isCompleted)
    })

    const filteredTasks = computed(() => {
      let copiedTasks = tasks.value.slice()

      if (searchInput.value) {
        copiedTasks = copiedTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchInput.value.toLowerCase())
        )
      }

      if (!filter.value.isCompleted) {
        copiedTasks = copiedTasks.filter((task) => !task.isCompleted)
      }

      if (filter.value.filterByDate) {
        return copiedTasks.filter((task) => {
          return task.dueDate ? dayjs(task.dueDate).isSame(filter.value.filterByDate, 'day') : false
        })
      }

      return copiedTasks
    })

    const filteredAndSortedTasks = computed(() => {
      const tasksToSort = filteredTasks.value.slice()

      if (filter.value.sortBy === SortBy.dueDate) {
        return tasksToSort.sort((a, b) => {
          if (!a.dueDate) {
            return -1
          }

          if (!b.dueDate) {
            return 1
          }

          if (filter.value.sortDirection === SortDirection.asc) {
            return dayjs(a.dueDate).diff(dayjs(b.dueDate))
          }

          return dayjs(b.dueDate).diff(dayjs(a.dueDate))
        })
      }

      if (filter.value.sortBy === SortBy.title) {
        return tasksToSort.sort((a, b) => {
          if (filter.value.sortDirection === SortDirection.asc) {
            return a.title.localeCompare(b.title)
          }

          return b.title.localeCompare(a.title)
        })
      }

      return tasksToSort
    })

    const isTaskDialogVisible = computed(() => {
      return taskToEdit.value !== null
    })

    const addTask = (newTask: TaskToAdd) => {
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
      if (index === -1) return

      tasks.value.splice(index, 1, task)
      taskToEdit.value = task
    }

    const deleteTask = (id: number) => {
      const index = tasks.value.findIndex((task) => task.id === id)
      if (index === -1) return

      tasks.value.splice(index, 1)
    }

    const setFilter = (newFilter: Filter) => {
      filter.value = newFilter
    }

    const searchTask = (search: string) => {
      searchInput.value = search
    }

    return {
      tasks,
      taskToEdit,
      completedTasks,
      filteredAndSortedTasks,
      isTaskDialogVisible,
      addTask,
      toggleTask,
      showTask,
      hideTask,
      updateTask,
      deleteTask,
      setFilter,
      searchTask
    }
  },
  {
    persist: true
  }
)
