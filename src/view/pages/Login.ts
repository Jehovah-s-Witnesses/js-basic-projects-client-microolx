import type { Component } from '../../types/Component.ts';

export const Login: Component = {
  render(): Element {
    const wrapper = document.createElement('div');

    wrapper.innerText = 'Login page';

    return wrapper;
  },
};
