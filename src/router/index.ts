import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue')
    },
    {
      path: '/students',
      name: 'students',
      component: () => import('../views/StudentsView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/StudentsView.vue')
    }
  ]
})

export default router
