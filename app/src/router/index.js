import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue')
    },
    {
      path: '/:token/reset-password',
      name: 'ResetPassword',
      component: () => import('@/views/auth/ResetPassword.vue')
    },
    {
      path: '/:token/validate-account',
      name: 'ValidateAccount',
      component: () => import('@/views/auth/ValidateAccount.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/ProfileView.vue')
    },
    {
      path: '/register-company',
      name: 'RegisterCompany',
      component: () => import('@/views/RegisterCompany.vue')
    },
    {
      path: '/job-offers',
      name: 'JobOffers',
      component: () => import('@/views/JobOffers.vue')
    },
    {
      path: '/applied-list',
      name: 'AppliedList',
      component: () => import('@/views/AppliedList.vue')
    },
    {
      path: '/appointment-list',
      name: 'AppointmentList',
      component: () => import('@/views/AppointmentList.vue')
    },
    {
      path: '/admin/',
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
      path: '/employer/',
      name: 'Employer',
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
              component: () => import ('@/views/employer/Jobs.vue')
            },
            {
              path: ':id/candidates',
              component: () => import ('@/views/employer/Candidates.vue')
            },
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/404NotFound.vue')
    }
  ]
})

export default router
