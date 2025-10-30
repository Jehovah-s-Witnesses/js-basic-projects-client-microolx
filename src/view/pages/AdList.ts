import type { Component } from '../../types/Component.ts';
import { Container } from '../components/Container/Container.ts';
import { Title } from '../components/Title/Title.ts';
import { getOwnAds } from '../../api/ad.ts';
import { Card } from '../components/Card/Card.ts';

export class AdList implements Component {
  render() {
    const wrapper = document.createElement('div');

    const title = new Title({
      text: 'Ads List',
    });
    const container = new Container();

    const cardListWrapper = document.createElement('div');

    getOwnAds({ limit: 10, offset: 0 }).then((response) => {
      response.data.items.forEach((item) => {
        const card = new Card(item);

        cardListWrapper.append(card.render());
      });
    });

    wrapper.append(container.render([title.render(), cardListWrapper]));

    return wrapper;
  }
}
