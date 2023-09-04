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
      meta: {
        title: 'Home'
      },
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
      meta: {
        title: 'Login'
      },
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
      meta: {
        title: 'Register'
      },
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
      meta: {
        title: 'Reset password'
      },
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
      meta: {
        title: 'Verify account'
      },
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
      },
      meta: {
        title: 'Profile'
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
      meta: {
        title: 'Job offers'
      },
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
      meta: {
        title: 'Applied list'
      },
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
          meta: {
            title: 'Quiz'
          },
          component: () => import('@/views/Test.vue')
        }
      ]
    },
    {
      path: '/appointment-list',
      name: 'AppointmentList',
      meta: {
        title: 'Appointment list'
      },
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
      meta: {
        title: 'Admin'
      },
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
        // {
        //   path: 'appointements/',
        //   name: 'AppointementsList',
        //   component: () => import('@/views/admin/AppointmentsList.vue')
        // },
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
      meta: {
        title: 'Employer'
      },
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
      meta: {
        title: 'Not found'
      },
      component: () => import('@/views/404NotFound.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const title = to.meta.title

  document.title = title ? `${title} - Larudakoté` : 'Larudakoté'

  return next()
})

export default router
