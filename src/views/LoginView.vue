<script setup lang="ts">
import { ref } from 'vue'
import firebaseApp from '@/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { HOME_VIEW } from '@/router'
import AuthenticationForm from '@/components/AuthenticationForm.vue'

const router = useRouter()

const errMsg = ref('')
const isSubmitLoading = ref(false)

const signIn = (email: string, password: string) => {
  const auth = getAuth(firebaseApp)

  isSubmitLoading.value = true
  errMsg.value = ''

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      isSubmitLoading.value = false
      router.push({ name: HOME_VIEW })
    })
    .catch((error) => {
      isSubmitLoading.value = false

      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break
        default:
          errMsg.value = 'Email or password was incorrect'
          break
      }
    })
}
</script>

<template>
  <AuthenticationForm
    title="Login to Your Account"
    submitLabel="Login"
    :errMsg="errMsg"
    :isSubmitLoading="isSubmitLoading"
    @submit="signIn"
  >
    <template #link>
      <router-link to="/register">Create a new account</router-link>
    </template>
  </AuthenticationForm>
</template>
