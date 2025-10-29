import type { Component } from '../../types/Component.ts';
import { Title } from '../components/Title/Title.ts';
import { Container } from '../components/Container/Container.ts';
import { FormInput } from '../components/FormInput/FormInput.ts';
import { FormSelect } from '../components/FormSelect/FormSelect.ts';
import { Form } from '../components/Form/Form.ts';
import {
  type Ad,
  adSchema,
  Currency,
  Status,
} from '../../schemas/ad.schema.ts';
import { createAd } from '../../api/ad.ts';
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
          value: 'select value',
          label: 'Select value',
        },
        {
          value: Currency.USD,
          label: 'USD',
        },
        {
          value: Currency.UAH,
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
          value: 'select value',
          label: 'Select value',
        },
        {
          value: Status.Draft,
          label: 'Draft',
        },
        {
          value: Status.Public,
          label: 'Public',
        },
        {
          value: Status.Archived,
          label: 'Archived',
        },
      ],
    });

    const title = new Title({
      text: 'Create new Ad',
    });

    const currentForm = new Form<Ad>({
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
      preparationDataBeforeValidation: (data) => {
        if (data.price) {
          data.price = Number(data.price);
        }

        return data;
      },
    });

    const container = new Container();

    wrapper.append(container.render([title.render(), currentForm.render()]));

    return wrapper;
  }
}
