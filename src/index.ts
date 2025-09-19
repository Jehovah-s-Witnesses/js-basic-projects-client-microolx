import { Login } from './view/pages/Login.ts';
import { Register } from './view/pages/Register.ts';
import { Router } from './router/router.ts';

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router({
    routes: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
    ],
  });

  router.initialize();
});
