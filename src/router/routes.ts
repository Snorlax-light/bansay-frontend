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
        name: 'login',
      },
      {
        path: 'register',
        component: () => import('pages/register/RegisterPage.vue'),
        name: 'register',
      },

      // These dashboard routes are redundant and removed to avoid conflict:
      // { path: 'student-dashboard', component: () => import('pages/student/StudentDashboard.vue') },
      // { path: 'officer-dashboard', component: () => import('pages/Officer/OfficerDashboard.vue') },
      {
        path: 'student-dashboard',
        component: () => import('pages/student/StudentDashboard.vue'),
        meta: { requiresAuth: true, roles: ['Student'] },
      },
    ],
  },

  // =================================================================
  // STUDENT ROUTES (Fixed to support layout links)
  // =================================================================
  {
    path: '/student',
    component: () => import('pages/student/StudentDashboard.vue'),
  },

  // =================================================================
  // OFFICER ROUTES (NEW: Added OfficerLayout.vue)
  // =================================================================
  {
    path: '/officer',
    component: () => import('layouts/OfficerLayout.vue'), // << New Officer Layout
    children: [
      {
        path: 'manage',
        name: 'liability-management',
        component: () => import('pages/Officer/LiabilityManagementPage.vue'), // Placeholder
      },
      {
        path: 'appeals',
        name: 'appeal-review',
        component: () => import('pages/Officer/AppealReviewPage.vue'), // Placeholder
      },
      {
        path: 'verify',
        name: 'payment-verification',
        component: () => import('pages/Officer/PaymentVerificationPage.vue'), // Placeholder
      },
      {
        path: 'reports',
        name: 'officer-reports',
        component: () => import('pages/Officer/ReportsPage.vue'), // Placeholder
      },
    ],
  },

  // =================================================================
  // ADMIN ROUTES (Existing Structure - Added name for consistency)
  // =================================================================
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ['Admin'] },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('pages/Admin/AdminDashboard.vue'),
      },
      {
        path: 'users',
        name: 'user-management',
        component: () => import('pages/Admin/UserManagementPage.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
