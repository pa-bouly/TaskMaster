<script setup lang="ts">
import { ref } from 'vue'
import { ElInput } from 'element-plus'
import debounce from 'lodash/debounce'

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const search = ref('')

const onSearch = debounce((query: string) => {
  emit('search', query)
}, 300)
</script>

<template>
  <header class="sticky top-0 flex items-center justify-between bg-white p-4 shadow-sm">
    <h1 class="text-2xl font-medium tracking-wide">TaskMaster</h1>

    <el-input
      v-model="search"
      placeholder="Search title, description"
      size="small"
      class="max-w-md"
      clearable
      prefix-icon="el-icon-search"
      data-testid="search-input"
      @clear="search = ''"
      @input="onSearch"
    />
    <div></div>
  </header>
</template>

<style lang="css" scoped>
header {
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  background-color: #2d0f37;
  color: white;
}
</style>
