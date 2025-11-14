import { Login } from './view/pages/Login.ts';
import { Register } from './view/pages/Register.ts';
import { Router } from './router/router.ts';
import { CreateAd } from './view/pages/CreateAd.ts';
import { AdList } from './view/pages/AdList.ts';

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
        component: new CreateAd(),
      },
      {
        path: '/adList',
        component: new AdList(),
      },
    ],
  });

  router.initialize();
});
