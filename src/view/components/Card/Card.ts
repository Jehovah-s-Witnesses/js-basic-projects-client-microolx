import type { Component } from '../../../types/Component.ts';
import type { AdEntity } from '../../../types/dto/ad.ts';

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
 <footer class="card-footer">
    <a href="#" class="card-footer-item has-text-primary">Save</a>
    <a href="#" class="card-footer-item has-text-primary">Delete</a>
  </footer>
    `;

    return this.wrapper;
  }
}
