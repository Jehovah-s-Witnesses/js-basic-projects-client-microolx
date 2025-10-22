import type { Component } from '../../types/Component.ts';
import { Title } from '../components/Title/Title.ts';
import { Container } from '../components/Container/Container.ts';
import { FormInput } from '../components/FormInput/FormInput.ts';
import { FormSelect } from '../components/FormSelect/FormSelect.ts';
import { Form } from '../components/Form/Form.ts';
import { type AdPayload, adSchema } from '../../schemas/ad.schema.ts';
import { createAd } from '../../api/user.ts';
import { AxiosError } from 'axios';

export class Ad implements Component {
  render() {
    const wrapper = document.createElement('div');

    const titleInput = new FormInput({
      name: 'title',
      label: 'Title',
    });

    const descriptionInput = new FormInput({
      name: 'description',
      label: 'Description',
    });

    const priceInput = new FormInput({
      name: 'price',
      label: 'Price',
    });

    const currencyElement = new FormSelect({
      name: 'currency',
      label: 'Currency',
      options: [
        {
          value: 'usd',
          label: 'USD',
        },
        {
          value: 'uah',
          label: 'UAH',
        },
      ],
    });

    const locationInput = new FormInput({
      name: 'location',
      label: 'Location',
    });

    const statusElement = new FormSelect({
      name: 'status',
      label: 'Status',
      options: [
        {
          value: 'draft',
          label: 'Draft',
        },
        {
          value: 'public',
          label: 'Public',
        },
        {
          value: 'archived',
          label: 'Archived',
        },
      ],
    });

    const title = new Title({
      text: 'Create new Ad',
    });

    const currentForm = new Form<AdPayload>({
      onSubmit: async (data) => {
        try {
          await createAd(data);
        } catch (err) {
          if (err instanceof AxiosError && err.response) {
            if (err.response.status === 400) {
              statusElement.setError(err.response.data.message);
            }
          }
        }
      },
      validationSchema: adSchema,
      controls: [
        titleInput,
        descriptionInput,
        priceInput,
        currencyElement,
        locationInput,
        statusElement,
      ],
    });

    const container = new Container();

    // if (!accessTokenStorage.hasValue()) {
    //   location.pathname = '/login';
    //   throw new Error('Not authorized!');
    // }

    wrapper.append(container.render([title.render(), currentForm.render()]));

    return wrapper;
  }
}
