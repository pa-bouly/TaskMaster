<script setup lang="ts">
import { ElCheckbox } from 'element-plus'
</script>

<template>
  <el-checkbox v-bind="$attrs" class="checkbox-rounded" aria-label="check-task" />
</template>

<style>
.checkbox-rounded {
  .el-checkbox__inner {
    height: 20px !important;
    width: 20px !important;
    border-radius: 50%;

    &::after {
      top: 5px !important;
      left: 7px !important;
    }
  }
}
</style>
