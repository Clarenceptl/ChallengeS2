import { createRouter, createWebHistory } from 'vue-router'
import { isConnected } from '@/middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          return next({ name: 'Login' })
        }
        return next()
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          return next()
        }
        return next({ name: 'Home' })
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue'),
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          return next()
        }
        return next({ name: 'Home' })
      }
    },
    {
      path: '/reset-password/:token',
      name: 'ResetPassword',
      component: () => import('@/views/auth/ResetPassword.vue'),
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          return next()
        }
        return next({ name: 'Home' })
      }
    },
    {
      path: '/verify-account/:token',
      name: 'ValidateAccount',
      component: () => import('@/views/auth/ValidateAccount.vue'),
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          return next()
        }
        return next({ name: 'Home' })
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/ProfileView.vue'),
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          return next({ name: 'Login' })
        }
        return next()
      }
    },
    {
      path: '/register-company',
      name: 'RegisterCompany',
      component: () => import('@/views/RegisterCompany.vue'),
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          return next({ name: 'Login' })
        }
        return next()
      }
    },
    {
      path: '/job-offers',
      name: 'JobOffers',
      component: () => import('@/views/JobOffers.vue'),
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          return next({ name: 'Login' })
        }
        return next()
      }
    },
    {
      path: '/admin/',
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          return next({ name: 'Login' })
        }
        return next()
      },
      children: [
        {
          path: '',
          name: 'Admin',
          component: () => import('@/views/admin/AdminView.vue')
        },
        {
          path: 'users/',
          name: 'UsersList',
          component: () => import('@/views/admin/UsersList.vue')
        },
        {
          path: 'company-information/',
          children: [
            {
              path: '',
              component: () => import('@/views/admin/CompanyInformation.vue')
            },
            {
              path: 'new',
              component: () => import('@/views/admin/NewCompanyInformation.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/404NotFound.vue')
    }
  ]
})

export default router
