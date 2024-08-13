import { createRouter, createWebHistory } from 'vue-router'
import firebaseApp from '@/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const HOME_VIEW = 'home'
export const LOGIN_VIEW = 'login'
export const REGISTER_VIEW = 'register'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: LOGIN_VIEW,
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: REGISTER_VIEW,
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/',
      name: HOME_VIEW,
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: HOME_VIEW }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const currentUser = await getCurrentUser()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!currentUser) {
      next({ name: LOGIN_VIEW })
    } else {
      next()
    }
  } else {
    // Redirect to home if user is already logged in
    if (currentUser) {
      next({ name: HOME_VIEW })
      return
    }
    next()
  }
  return
})

export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const auth = getAuth(firebaseApp)
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

export default router
