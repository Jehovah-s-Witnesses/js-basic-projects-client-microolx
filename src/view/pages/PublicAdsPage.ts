import type { Component } from '../../types/Component.ts';
import { ListPage } from '../modules/ListPage.ts';
import { CardType } from '../components/Card/Card.type.ts';
import { getOwnAds, getPublicAds } from '../../api/ad.ts';

export class PublicAdsPage implements Component {
  render() {
    const listPage = new ListPage({
      title: 'Public ads',
      cardType: CardType.Public,
      async loadData(params) {
        const { data } = await getPublicAds(params);
        return data;
      },
    });

    return listPage.render();
  }
}
