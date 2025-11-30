import type { Component } from '../../types/Component.ts';
import { CardType } from '../components/Card/Card.type.ts';
import { Title } from '../components/Title/Title.ts';
import { Container } from '../components/Container/Container.ts';
import { DEFAULT_LIMIT } from '../components/Constants/constants.ts';
import { Card } from '../components/Card/Card.ts';
import { Pagination } from '../components/Pagination/Pagination.ts';
import type { AdEntity } from '../../types/dto/ad.ts';

type ListPageParams = {
  cardType: CardType;
  title: string;
  loadData: (params: {
    offset: number;
    limit: number;
  }) => Promise<{ items: AdEntity[]; count: number }>;
};

export class ListPage implements Component {
  wrapper = document.createElement('div');
  params: ListPageParams;

  constructor(params: ListPageParams) {
    this.params = params;
  }

  render() {
    const title = new Title({
      text: this.params.title,
    });
    const container = new Container();
    let currentPage = 1;

    const loadData = () => {
      this.params
        .loadData({
          limit: DEFAULT_LIMIT,
          offset: (currentPage - 1) * DEFAULT_LIMIT,
        })
        .then(({ items, count }) => {
          items.forEach((item) => {
            const card = new Card(item, this.params.cardType);

            cardListWrapper.append(card.render());
          });
          pagination.rerender({ total: count, currentPage });
        });
    };

    const pagination = new Pagination({
      total: 0,
      currentPage: currentPage,
    });

    pagination.setOnPageChange((newPage) => {
      currentPage = newPage;

      loadData();
    });

    const cardListWrapper = document.createElement('div');

    loadData();

    this.wrapper.append(
      container.render([title.render(), cardListWrapper, pagination.render()]),
    );

    return this.wrapper;
  }
}
