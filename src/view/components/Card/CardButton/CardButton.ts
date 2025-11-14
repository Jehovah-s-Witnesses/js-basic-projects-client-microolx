import type { Component } from '../../../../types/Component.ts';

type CardParams = {
  text: string;
  onClick?: () => void;
};

export class CardButton implements Component {
  props: CardParams;

  constructor(props: CardParams) {
    this.props = props;
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('card-footer-item', 'has-text-primary');
    button.textContent = this.props.text;

    if (this.props.onClick) {
      button.addEventListener('click', (event) => {
        event.preventDefault();

        this.props.onClick!();
      });
    }

    return button;
  }
}
