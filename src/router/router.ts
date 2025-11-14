import type { RouterConfig } from './router.types.ts';
import { Header } from '../view/components/Header/Header.ts';

export class Router {
  config: RouterConfig;

  constructor(config: RouterConfig) {
    this.config = config;
  }

  static staticRedirect(page: string) {
    location.pathname = page;
  }

  initialize() {
    const currentRoute = this.config.routes.find((route) => {
      return route.path === location.pathname;
    });

    const header = new Header();
    document.body.append(header.render());

    if (currentRoute) {
      document.body.append(currentRoute.component.render());
    }
  }
}
