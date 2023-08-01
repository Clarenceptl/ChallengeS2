import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '../stores/users.store'
import { storeToRefs } from 'pinia'
import { isConnected } from '../middleware/auth.middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: async (to, from, next) => {
        if (await isConnected()) {
          await useUsersStore().loadData()
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
          return next({ name: 'Home' })
        }
        await useUsersStore().loadData()
        return next()
      }
    },
    {
      path: '/register-company',
      name: 'RegisterCompany',
      component: () => import('@/views/RegisterCompany.vue'),
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          const userStore = storeToRefs(useUsersStore())
          if (userStore.isUser.value) {
            return next({ name: 'Home' })
          }
        }
        await useUsersStore().loadData()
        return next()
      }
    },
    {
      path: '/job-offers',
      name: 'JobOffers',
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          const userStore = storeToRefs(useUsersStore())
          if (userStore.isUser.value) {
            return next({ name: 'Home' })
          }
        }
        await useUsersStore().loadData()
        return next()
      },
      component: () => import('@/views/JobOffers.vue')
    },
    {
      path: '/applied-list',
      name: 'AppliedList',
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          const userStore = storeToRefs(useUsersStore())
          if (userStore.isUser.value) {
            return next({ name: 'Home' })
          }
        }
        await useUsersStore().loadData()
        return next()
      },
      children: [
        {
          path: '',
          name: 'AppliedList',
          component: () => import('@/views/AppliedList.vue')
        },
        {
          path: ':id/test',
          name: 'Test',
          component: () => import('@/views/Test.vue')
        }
      ]
    },
    {
      path: '/appointment-list',
      name: 'AppointmentList',
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          const userStore = storeToRefs(useUsersStore())
          if (userStore.isUser.value) {
            return next({ name: 'Home' })
          }
        }
        await useUsersStore().loadData()
        return next()
      },
      component: () => import('@/views/AppointmentList.vue')
    },
    {
      path: '/admin/',
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          const userStore = storeToRefs(useUsersStore())
          if (!userStore.isAdmin.value) {
            return next({ name: 'Home' })
          }
        }
        await useUsersStore().loadData()
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
          path: 'appointements/',
          name: 'AppointementsList',
          component: () => import('@/views/admin/AppointementsList.vue')
        },
        {
          path: 'company-information/',
          children: [
            {
              path: '',
              name: 'CompanyInformationsList',
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
      path: '/employer/',
      name: 'Employer',
      beforeEnter: async (to, from, next) => {
        if (!(await isConnected())) {
          const userStore = storeToRefs(useUsersStore())
          if (!userStore.isEmployer.value) {
            return next({ name: 'Home' })
          }
        }
        await useUsersStore().loadData()
        return next()
      },
      children: [
        {
          path: 'appointments',
          component: () => import('@/views/employer/Appointments.vue')
        },
        {
          path: 'jobs/',
          children: [
            {
              path: '',
              component: () => import('@/views/employer/Jobs.vue')
            },
            {
              path: ':id/candidates',
              component: () => import('@/views/employer/Candidates.vue')
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
