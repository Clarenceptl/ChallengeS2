import { createRouter, createWebHistory } from 'vue-router'

import AdminView from '../views/admin/AdminView.vue'
import CompanyInformation from '../views/admin/CompanyInformation.vue'
import NewCompanyInformation from '../views/admin/NewCompanyInformation.vue'
import UsersList from '../views/admin/UsersList.vue'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RegisterCompany from '../views/RegisterCompany.vue'
import JobOffers from '../views/JobOffers.vue'
import ProfileView from '../views/ProfileView.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ValidateAccount from '../views/ValidateAccount.vue'
import NotFound from '../views/404NotFound.vue'

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
      path: '/:token/reset-password',
      name: 'ResetPassword',
      component: () => ResetPassword
    },
    {
      path: '/:token/validate-account',
      name: 'ValidateAccount',
      component: () => ValidateAccount
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView
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
    {
      path: '/admin/',
      name: 'Admin',
      children: [
        {
          path: '',
          component: () => AdminView
        },
        {
          path: 'users/',
          name: 'UsersList',
          component: () => UsersList
        },
        {
          path: 'company-information/',
          children: [
            {
              path: '',
              component: () => CompanyInformation
            },
            {
              path: 'new',
              component: () => NewCompanyInformation
            },
          ],
        }
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => NotFound
    }
  ]
})

export default router
