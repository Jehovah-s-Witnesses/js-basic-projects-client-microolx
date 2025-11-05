import type { Component } from '../../../types/Component.ts';
import type { AdEntity } from '../../../types/dto/ad.ts';
import { Status } from '../../../schemas/ad.schema.ts';
import { CardButton } from './CardButton/CardButton.ts';

export class Card implements Component {
  wrapper = document.createElement('div');
  data: AdEntity;

  constructor(data: AdEntity) {
    this.data = data;
  }

  render() {
    this.wrapper.classList.add('card');
    this.wrapper.innerHTML = `
    <header class="card-header has-background-primary-dark">
    <h2 class="card-header-title is-size-3">${this.data.title}</h2>
  </header>
  <div class="notification has-background-success-dark">
 <p class="mb-1">${this.data.description}</p>
 <p class="mb-1">${this.data.price} ${this.data.currency}</p>
 <p class="mb-1">${this.data.location}</p>
 <p class="mb-1">${this.data.status}</p>
</div>
    `;

    if (this.data.status !== Status.Archived) {
      const footer = document.createElement('footer');
      footer.classList.add('card-footer');
      const publishButton = new CardButton('Publish');
      const archiveButton = new CardButton('Archive');

      if (this.data.status === Status.Draft) {
        footer.append(publishButton.render(), archiveButton.render());
      } else {
        footer.append(archiveButton.render());
      }

      this.wrapper.append(footer);
    }

    return this.wrapper;
  }
}
