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
      },
      {
        path: 'officer-dashboard',
        component: () => import('pages/Officer/OfficerDashboard.vue'),
      },
     
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '', name: 'admin-dashboard',
        component: () => import('src/pages/Admin/AdminDashboard.vue'),
      },
      {
        path: 'user-management',
        component: () => import('src/pages/Admin/UserManagementPage.vue'),
      },
      {
        path: 'pending-approvals',
        component: () => import('src/pages/Admin/PendingApprovalPage.vue')
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

];

export default routes;
