import type { Component } from '../../types/Component.ts';
import { CardType } from '../components/Card/Card.type.ts';
import { ListPage } from '../modules/ListPage.ts';
import { getOwnAds } from '../../api/ad.ts';

export class AdList implements Component {
  render() {
    const listPage = new ListPage({
      title: 'Own ads',
      cardType: CardType.Own,
      async loadData(params) {
        const { data } = await getOwnAds(params);

        return data;
      },
    });

    return listPage.render();
  }
}
