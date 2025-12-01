import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const { useAuthStore } = await import('src/stores/auth-store');
    const authStore = useAuthStore();

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const allowedRoles = to.meta.roles as string[] | undefined;

    if (requiresAuth) {
      if (!authStore.isAuthenticated) {
        // User is not logged in, redirect to login
        next('/login');
        return;
      }

      // User is logged in, check role if applicable
      if (allowedRoles) {
        const userRole = authStore.currentUser?.role;
        if (userRole && allowedRoles.includes(userRole)) {
          // User has allowed role
          next();
        } else {
          // User does not have allowed role, redirect to home/dashboard or show error
          // For now, redirect to root which should handle redirection based on role if implemented,
          // or just stay on current page (but that might loop if current page is restricted).
          // Safest is to redirect to a known safe page or their specific dashboard if known.
          // Since we don't have a generic "unauthorized" page, let's redirect to login for now to force re-login or just stop.
          // Better: Redirect to their own dashboard if possible, or just next(false).
          // Let's try to redirect to their dashboard based on their role.
          if (userRole === 'Student') next('/student-dashboard');
          else if (userRole === 'Officer') next('/officer-dashboard');
          else if (userRole === 'Admin') next('/admin-dashboard');
          else next('/login'); // Fallback
        }
      } else {
        // No specific roles required, just auth
        next();
      }
    } else {
      // Route does not require auth
      next();
    }
  });

  return Router;
});
