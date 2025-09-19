import type { Component } from '../types/Component.ts';

export type Route = {
  path: string;
  component: Component;
};

export type RouterConfig = {
  routes: Route[];
};
