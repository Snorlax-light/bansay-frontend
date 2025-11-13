const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginRegister.vue') },
      { path: 'student-dashboard', component: () => import('pages/Students/StudentDashboard.vue') },
      { path: 'officer-dashboard', component: () => import('pages/Officer/OfficerDashboard.vue') },
      { path: 'admin-dashboard', component: () => import('pages/Admin/AdminDashboard.vue') },
    ],
  },
];

export default routes;
