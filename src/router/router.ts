import type { RouterConfig } from './router.types.ts';

export class Router {
  config: RouterConfig;

  constructor(config: RouterConfig) {
    this.config = config;
  }

  initialize() {
    const currentRoute = this.config.routes.find((route) => {
      return route.path === location.pathname;
    });

    if (currentRoute) {
      document.body.append(currentRoute.component.render());
    }
  }
}
