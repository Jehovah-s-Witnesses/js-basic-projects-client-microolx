import type { Component } from '../../../types/Component.ts';

type PaginationParams = {
  total: number;
  currentPage: number;
};
export class Pagination implements Component {
  navWrapper = document.createElement('nav');
  total: number;
  currentPage: number;

  constructor(params: PaginationParams) {
    this.total = params.total;
    this.currentPage = params.currentPage;
  }

  render() {
    this.navWrapper.classList.add('pagination');

    const paginationList = document.createElement('ul');
    paginationList.classList.add('pagination-list');
    this.navWrapper.append(paginationList);

    const totalPages = Math.ceil(this.total / 10);

    for (let a = 1; a <= totalPages; a++) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.classList.add('pagination-link');
      if (this.currentPage === a) {
        link.classList.add('is-current');
      }
      link.textContent = a.toString();
      item.append(link);

      paginationList.append(item);
    }
    return this.navWrapper;
  }
}
