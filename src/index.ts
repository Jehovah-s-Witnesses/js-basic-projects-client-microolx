import { Login } from './view/pages/Login.ts';
import { Register } from './view/pages/Register.ts';
import { Router } from './router/router.ts';
import { Ad } from './view/pages/Ad.ts';

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router({
    routes: [
      {
        path: '/login',
        component: new Login(),
      },
      {
        path: '/register',
        component: new Register(),
      },
      {
        path: '/ad',
        component: new Ad(),
      },
    ],
  });

  router.initialize();
});
