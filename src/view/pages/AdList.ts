import type { Component } from '../../types/Component.ts';
import { Container } from '../components/Container/Container.ts';
import { Title } from '../components/Title/Title.ts';
import { getOwnAds } from '../../api/ad.ts';
import { Card } from '../components/Card/Card.ts';
import { Pagination } from '../components/Pagination/Pagination.ts';
import { DEFAULT_LIMIT } from '../components/Constants/constants.ts';

export class AdList implements Component {
  render() {
    const wrapper = document.createElement('div');

    const title = new Title({
      text: 'Ads List',
    });
    const container = new Container();
    let currentPage = 1;
    const pagination = new Pagination({
      total: 0,
      currentPage: currentPage,
      onPageChange: (newPage) => {
        currentPage = newPage;
        getOwnAds({
          limit: DEFAULT_LIMIT,
          offset: (currentPage - 1) * DEFAULT_LIMIT,
        }).then((response) => {
          cardListWrapper.innerHTML = ``;
          response.data.items.forEach((item) => {
            const card = new Card(item);

            cardListWrapper.append(card.render());
          });
          pagination.rerender({ total: response.data.count, currentPage });
        });
      },
    });

    const cardListWrapper = document.createElement('div');

    getOwnAds({ limit: DEFAULT_LIMIT, offset: 0 }).then((response) => {
      response.data.items.forEach((item) => {
        const card = new Card(item);

        cardListWrapper.append(card.render());
      });
      pagination.rerender({ total: response.data.count, currentPage });
    });

    wrapper.append(
      container.render([title.render(), cardListWrapper, pagination.render()]),
    );

    return wrapper;
  }
}
