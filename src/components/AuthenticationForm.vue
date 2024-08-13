<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const props = defineProps<{
  title: string
  submitLabel: string
  errMsg: string
  isSubmitLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', email: string, password: string): void
}>()

const formRef = ref<FormInstance>()
const form = reactive<{
  password: string
  email: string
}>({
  password: '',
  email: ''
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      emit('submit', form.email, form.password)
    }
  })
}
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <div class="w-full max-w-md rounded border border-slate-100 bg-white p-6">
      <h1 class="mb-4 text-center text-2xl font-medium tracking-wide">TaskMaster</h1>

      <div class="mb-4 text-center">{{ props.title }}</div>

      <el-form ref="formRef" :model="form" label-width="auto">
        <el-form-item
          label="Email"
          prop="email"
          :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur']
            }
          ]"
        >
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password"
          :rules="[
            {
              required: true,
              message: 'Please input password',
              trigger: 'blur'
            },
            {
              min: 6,
              message: 'The length of password should be 6',
              trigger: 'blur'
            }
          ]"
        >
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <div class="mb-4 text-center italic text-red-600">
          {{ props.errMsg }}
        </div>
        <el-form-item>
          <div class="flex flex-1 justify-center">
            <el-button :loading="props.isSubmitLoading" type="primary" @click="submitForm(formRef)">
              {{ props.submitLabel }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>

      <div class="mt-4 text-center text-sm italic underline hover:underline-offset-2">
        <slot name="link"></slot>
      </div>
    </div>
  </div>
</template>
