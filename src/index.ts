import { Login } from './view/pages/Login.ts';
import { Register } from './view/pages/Register.ts';
import { Router } from './router/router.ts';
import { CreateAd } from './view/pages/CreateAd.ts';
import { OwnsAdsList } from './view/pages/OwnsAdsList.ts';
import { PublicAdsPage } from './view/pages/PublicAdsPage.ts';

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
        path: '/ownAds',
        component: new OwnsAdsList(),
      },
      {
        path: '/publicAds',
        component: new PublicAdsPage(),
      },
    ],
  });

  router.initialize();
});
