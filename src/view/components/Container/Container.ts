import type { Component } from '../../../types/Component.ts';

export class Container implements Component {
  containerWrapper = document.createElement('div');
  render(children: Element[] = []): Element {
    this.containerWrapper.append(...children);
    this.containerWrapper.classList.add('container');

    return this.containerWrapper;
  }
}
