const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/Auth/LoginRegister.vue') }],
  },

  {
    path: '/student-dashboard',
    component: () => import('src/pages/Students/StudentDashboard.vue'),
  },
  {
    path: '/officer-dashboard',
    component: () => import('src/pages/Officer/OfficerDashboard.vue'),
  },
  {
    path: '/admin-dashboard',
    component: () => import('src/pages/Admin/AdminDashboard.vue'),
  },
  {
    path: '/admin/user-management',
    component: () => import('src/pages/Admin/UserManagementPage.vue'),
  },
];

export default routes;
