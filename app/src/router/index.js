import { createRouter, createWebHistory } from 'vue-router'
import {
  isLogged,
  isNotLogged,
  isEmployer,
  middlewarePipeline,
  isSimpleUser,
  isAdmin
} from '../middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: 'Home',
        middleware: [isLogged]
      },
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: 'Login',
        middleware: [isNotLogged]
      },
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        title: 'Register',
        middleware: [isNotLogged]
      },
      component: () => import('@/views/auth/RegisterView.vue')
    },
    {
      path: '/reset-password/:token',
      name: 'ResetPassword',
      meta: {
        title: 'Reset password',
        middleware: [isNotLogged]
      },
      component: () => import('@/views/auth/ResetPassword.vue')
    },
    {
      path: '/verify-account/:token',
      name: 'ValidateAccount',
      meta: {
        title: 'Verify account',
        middleware: [isNotLogged]
      },
      component: () => import('@/views/auth/ValidateAccount.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        title: 'Profile',
        middleware: [isLogged]
      },
      component: () => import('@/views/ProfileView.vue')
    },
    {
      path: '/register-company',
      name: 'RegisterCompany',
      meta: {
        title: 'Register company',
        middleware: [isLogged, isSimpleUser]
      },
      component: () => import('@/views/RegisterCompany.vue')
    },
    {
      path: '/job-offers',
      name: 'JobOffers',
      meta: {
        title: 'Job offers',
        middleware: [isLogged, isSimpleUser]
      },
      component: () => import('@/views/JobOffers.vue')
    },
    {
      path: '/applied-list',
      name: 'AppliedList',
      meta: {
        title: 'Applied list',
        middleware: [isLogged, isSimpleUser]
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
        title: 'Appointment list',
        middleware: [isLogged, isSimpleUser]
      },
      component: () => import('@/views/AppointmentList.vue')
    },
    {
      path: '/admin/',
      meta: {
        title: 'Admin',
        middleware: [isLogged, isAdmin]
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
        title: 'Employer',
        middleware: [isLogged, isEmployer]
      },
      children: [
        {
          path: 'appointments',
          name: 'EmployerAppointments',
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
  if (!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next
    //   store  | You can also pass store as an argument
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
