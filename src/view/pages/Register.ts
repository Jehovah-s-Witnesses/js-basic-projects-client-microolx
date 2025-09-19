import type { Component } from '../../types/Component.ts';

export const Register: Component = {
  render(): Element {
    const wrapper = document.createElement('div');

    wrapper.innerText = 'Register page';

    return wrapper;
  },
};
