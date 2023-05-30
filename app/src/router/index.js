import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RegisterCompany from '../views/RegisterCompany.vue'
import JobOffers from '../views/JobOffers.vue'
import CompanyInformation from '../views/CompanyInformation.vue'
import NewCompanyInformation from '../views/NewCompanyInformation.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminView from '../views/AdminView.vue'

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
      path: '/profile',
      name: 'Profile',
      component: ProfileView
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
    // {
    //   path: '/company-information/',
    //   name: 'CompanyInformation',
    //   children: [
    //     {
    //       path: '',
    //       component: () => CompanyInformation
    //     },
    //     {
    //       path: 'new',
    //       component: () => NewCompanyInformation
    //     },
    //   ],
    // },
    {
      path: '/admin/',
      name: 'Admin',
      children: [
        {
          path: '',
          component: () => AdminView
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
    }
  ]
})

export default router
