import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/login' },

      {
        path: 'login',
        component: () => import('pages/login/LoginPage.vue'),
      },
      {
        path: 'register',
        component: () => import('pages/register/RegisterPage.vue'),
      },

      {
        path: 'student-dashboard',
        component: () => import('pages/student/StudentDashboard.vue'),
        meta: { requiresAuth: true, roles: ['Student'] },
      },
      {
        path: 'officer-dashboard',
        component: () => import('pages/Officer/OfficerDashboard.vue'),
        meta: { requiresAuth: true, roles: ['Officer'] },
      },
      {
        path: 'admin-dashboard',
        component: () => import('pages/Admin/AdminDashboard.vue'),
        meta: { requiresAuth: true, roles: ['Admin'] },
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ['Admin'] },
    children: [
      {
        path: '',
        component: () => import('pages/Admin/AdminDashboard.vue')
      },
      {
        path: 'users',
        name: 'user-management',
        component: () => import('pages/Admin/UserManagementPage.vue')
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

];

export default routes;
