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
import DatePicker from '@/components/DatePicker.vue'

const store = useTasksStore()

interface Props {
  isOpenByDefault?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpenByDefault: false
})

const showPopper = ref(props.isOpenByDefault)
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
  <Popper arrow v-bind:show="props.isOpenByDefault ? showPopper : undefined">
    <el-button :icon="Operation" data-testid="show-filters-btn" @click="showPopper = true">
      View
    </el-button>
    <template #content>
      <div class="shadow-mg round relative border bg-white p-4">
        <div class="flex items-center">
          <el-icon><CircleCheck /></el-icon>
          <div class="flex flex-1 items-center justify-between">
            <span class="ml-2 mr-4 text-xs">Completed</span>
            <el-switch
              v-model="filterIsCompleted"
              size="small"
              @change="updateFilter"
              aria-label="switch-to-show-completed-tasks"
              data-testid="show-completed-tasks-switch"
            />
          </div>
        </div>
        <div class="mt-2">
          <div class="text-xs font-bold">Sort by</div>
          <div class="mt-2 flex items-center">
            <el-icon><Sort /></el-icon>
            <div class="flex flex-1 items-center justify-between">
              <span class="ml-2 mr-4 text-xs">Sorting</span>

              <el-dropdown trigger="click" :teleported="false" tabindex="0" @command="onSort">
                <span class="el-dropdown-link" data-testid="sort-dropdown">
                  {{ sortLabel }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="SortBy.title" data-testid="sort-by-title">
                      Title
                    </el-dropdown-item>
                    <el-dropdown-item :command="SortBy.dueDate" data-testid="sort-by-due-date">
                      Due date
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div v-if="sortValue" class="mt-2 flex items-center">
            <el-icon>
              <SortUp v-if="directionValue === SortDirection.desc" />

              <SortDown v-else
            /></el-icon>
            <div class="flex flex-1 items-center justify-between">
              <span class="ml-2 mr-4 text-xs">Direction</span>

              <el-radio-group v-model="directionValue" size="small" @change="updateFilter">
                <el-radio-button
                  label="Ascending"
                  :value="SortDirection.asc"
                  data-testid="sort-ascending"
                />
                <el-radio-button
                  label="Descending"
                  :value="SortDirection.desc"
                  data-testid="sort-descending"
                />
              </el-radio-group>
            </div>
          </div>
        </div>

        <div class="mt-2">
          <div class="mt-4 text-xs font-bold">Filter by</div>
          <div class="mt-2 flex items-center">
            <el-icon><Calendar /></el-icon>
            <div class="flex items-center justify-between">
              <label for="filter-due-date" class="ml-2 mr-4 cursor-pointer text-xs">Due date</label>
              <DatePicker
                v-model="filterDueDate"
                id="filter-due-date"
                size="small"
                can-select-past-dates
                data-testid="datepicker-task"
                :teleported="false"
                @change="updateFilter"
              />
            </div>
          </div>
        </div>

        <div class="mt-2 border-solid">
          <el-button
            type="danger"
            size="small"
            data-testid="reset-filter-btn"
            @click="onResetClick"
          >
            Reset
          </el-button>
        </div>
      </div>
    </template>
  </Popper>
</template>
