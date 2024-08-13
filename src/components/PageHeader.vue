<script setup lang="ts">
import { ref } from 'vue'
import { ElInput } from 'element-plus'
import debounce from 'lodash/debounce'
import firebaseApp from '@/firebase'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { LOGIN_VIEW } from '@/router'

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const router = useRouter()

const search = ref('')

const onSearch = debounce((query: string) => {
  emit('search', query)
}, 300)

const onDropdownItemClick = (command: string) => {
  if (command === 'logout') {
    const auth = getAuth(firebaseApp)

    signOut(auth).then(() => {
      router.push({
        name: LOGIN_VIEW
      })
    })
  }
}
</script>

<template>
  <header
    class="sticky top-0 flex flex-wrap items-center justify-between gap-3 p-4 shadow-sm sm:flex-nowrap"
  >
    <h1 class="mr-2 text-2xl font-medium tracking-wide">TaskMaster</h1>

    <div class="hidden w-full justify-center sm:flex">
      <el-input
        v-model="search"
        placeholder="Search title, description"
        size="small"
        class="block max-w-md md:hidden"
        clearable
        prefix-icon="el-icon-search"
        data-testid="search-input-desktop"
        @clear="search = ''"
        @input="onSearch"
      />
    </div>

    <el-dropdown @command="onDropdownItemClick">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        class="ml-2"
        aria-label="avatar"
        alt="avatar"
      />

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <div class="flex w-full justify-center sm:hidden">
      <el-input
        v-model="search"
        placeholder="Search title, description"
        size="small"
        class="block max-w-md md:hidden"
        clearable
        prefix-icon="el-icon-search"
        data-testid="search-input-mobile"
        @clear="search = ''"
        @input="onSearch"
      />
    </div>
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
