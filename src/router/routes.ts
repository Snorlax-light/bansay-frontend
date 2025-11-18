const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Auth/LoginRegister.vue') },
      {
        path: '/student-dashboard',
        component: () => import('src/pages/Students/StudentDashboard.vue'),
      },
      {
        path: '/officer-dashboard',
        component: () => import('src/pages/Officer/OfficerDashboard.vue'),
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

];

export default routes;
