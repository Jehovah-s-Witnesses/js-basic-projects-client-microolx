import type { Component } from '../../../types/Component.ts';
import classNames from 'classnames';

type ButtonParams = {
  text: string;
  type?: HTMLButtonElement['type'];
  variant?: 'success' | 'info' | 'danger' | 'link';
};
export class Button implements Component {
  buttonElement = document.createElement('button');

  constructor(params: ButtonParams) {
    this.buttonElement.innerText = params.text;
    this.buttonElement.type = params.type ?? 'button';
    this.buttonElement.className = classNames('button', {
      'is-danger': params.variant === 'danger',
      'is-success': params.variant === 'success',
      'is-info': params.variant === 'info',
      'is-link': params.variant === 'link',
    });
  }

  render(): Element {
    return this.buttonElement;
  }
}
