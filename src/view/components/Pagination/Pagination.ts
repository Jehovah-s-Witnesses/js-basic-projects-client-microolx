import type { Component } from '../../../types/Component.ts';
import { DEFAULT_LIMIT } from '../Constants/constants.ts';

type PaginationParams = {
  total: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
};
export class Pagination implements Component {
  navWrapper = document.createElement('nav');
  total: number;
  currentPage: number;
  onPageChange: PaginationParams['onPageChange'];

  constructor(params: PaginationParams) {
    this.total = params.total;
    this.currentPage = params.currentPage;
    this.onPageChange = params.onPageChange;
  }

  rerender(params: Omit<PaginationParams, 'onPageChange'>) {
    this.navWrapper.classList.add('pagination');
    this.total = params.total;
    this.currentPage = params.currentPage;

    this.navWrapper.innerHTML = ``;

    const paginationList = document.createElement('ul');
    paginationList.classList.add('pagination-list');
    this.navWrapper.append(paginationList);

    const totalPages = Math.ceil(this.total / DEFAULT_LIMIT);

    for (let a = 1; a <= totalPages; a++) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.classList.add('pagination-link');
      if (this.currentPage === a) {
        link.classList.add('is-current');
      }
      link.textContent = a.toString();
      link.addEventListener('click', (event) => {
        event.preventDefault();
        this.onPageChange(a);
      });
      item.append(link);

      paginationList.append(item);
    }
  }

  render() {
    this.rerender({ total: this.total, currentPage: this.currentPage });
    return this.navWrapper;
  }
}
