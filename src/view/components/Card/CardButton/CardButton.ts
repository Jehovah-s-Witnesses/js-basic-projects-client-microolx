import type { Component } from '../../../../types/Component.ts';

export class CardButton implements Component {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('card-footer-item', 'has-text-primary');
    button.textContent = this.text;

    return button;
  }
}
