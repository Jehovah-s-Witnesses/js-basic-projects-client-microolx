import type { Component } from '../../../types/Component.ts';
import classNames from 'classnames';

type TitleParams = {
  text: string;
  variant?: '1' | '2' | '3' | '4' | '5' | '6';
};

export class Title implements Component {
  titleWrapper = document.createElement('div');

  constructor(params: TitleParams) {
    this.titleWrapper.innerText = params.text;
    this.titleWrapper.className = classNames('title', {
      'is-1': !params.variant || params.variant === '1',
      'is-2': params.variant === '2',
      'is-3': params.variant === '3',
      'is-4': params.variant === '4',
      'is-5': params.variant === '5',
      'is-6': params.variant === '6',
    });
  }

  render(): Element {
    return this.titleWrapper;
  }
}
