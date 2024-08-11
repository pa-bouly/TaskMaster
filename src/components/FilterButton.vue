<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowDown,
  Sort,
  SortDown,
  SortUp,
  Calendar,
  CircleCheck,
  Operation
} from '@element-plus/icons-vue'
import Popper from 'vue3-popper'
import { useTasksStore, SortBy, SortDirection } from '@/stores/tasks'

const store = useTasksStore()

const directionValue = ref(SortDirection.asc)
const filterDueDate = ref<Date | null>(null)
const filterIsCompleted = ref(true)
const sortValue = ref<SortBy | null>(null)

const onSort = (order: SortBy) => {
  sortValue.value = order
  updateFilter()
}

const sortLabel = computed(() => {
  if (!sortValue.value) return 'Manual (default)'

  return sortValue.value === SortBy.title ? 'Title' : 'Due date'
})

const updateFilter = () => {
  store.setFilter({
    sortBy: sortValue.value,
    sortDirection: directionValue.value,
    filterByDate: filterDueDate.value,
    isCompleted: filterIsCompleted.value
  })
}

const onResetClick = () => {
  sortValue.value = null
  directionValue.value = SortDirection.asc
  filterDueDate.value = null
  filterIsCompleted.value = true
  updateFilter()
}
</script>

<template>
  <Popper arrow>
    <el-button :icon="Operation"> View </el-button>
    <template #content>
      <div class="shadow-mg round relative border bg-white p-4">
        <div class="flex items-center">
          <el-icon><CircleCheck /></el-icon>
          <div class="flex flex-1 items-center justify-between">
            <span class="ml-2 mr-4 text-xs">Completed</span>
            <el-switch v-model="filterIsCompleted" size="small" @change="updateFilter" />
          </div>
        </div>
        <div class="mt-2">
          <div class="text-xs font-bold">Sort by</div>
          <div class="mt-2 flex items-center">
            <el-icon><Sort /></el-icon>
            <div class="flex flex-1 items-center justify-between">
              <span class="ml-2 mr-4 text-xs">Sorting</span>

              <el-dropdown trigger="click" :teleported="false" tabindex="0" @command="onSort">
                <span class="el-dropdown-link">
                  {{ sortLabel }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="SortBy.title">Title</el-dropdown-item>
                    <el-dropdown-item :command="SortBy.dueDate">Due date</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div v-if="sortValue" class="mt-2 flex items-center">
            <el-icon>
              <SortUp v-if="directionValue === 'desc'" />

              <SortDown v-else
            /></el-icon>
            <div class="flex flex-1 items-center justify-between">
              <span class="ml-2 mr-4 text-xs">Direction</span>

              <el-radio-group v-model="directionValue" size="small" @change="updateFilter">
                <el-radio-button label="Ascending" :value="SortDirection.asc" />
                <el-radio-button label="Descending" :value="SortDirection.desc" />
              </el-radio-group>
            </div>
          </div>
        </div>

        <div class="mt-2">
          <div class="mt-4 text-xs font-bold">Filter by</div>
          <div class="mt-2 flex items-center">
            <el-icon><Calendar /></el-icon>
            <div class="flex items-center justify-between">
              <span class="ml-2 mr-4 text-xs">Due date</span>
              <el-date-picker
                v-model="filterDueDate"
                size="small"
                type="date"
                placeholder="Pick a day"
                :teleported="false"
                @change="updateFilter"
              />
            </div>
          </div>
        </div>

        <div class="mt-2 border-solid">
          <el-button type="danger" text size="small" @click="onResetClick">Reset</el-button>
        </div>
      </div>
    </template>
  </Popper>
</template>
