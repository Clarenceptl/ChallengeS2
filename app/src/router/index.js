import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RegisterCompany from '../views/RegisterCompany.vue'
import JobOffers from '../views/JobOffers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: () => RegisterView
    },
    {
      path: '/register-company',
      name: 'RegisterCompany',
      component: () => RegisterCompany
    },
    {
      path: '/job-offers',
      name: 'JobOffers',
      component: () => JobOffers
    },
  ]
})

export default router
