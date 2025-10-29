import { describe, it, expect, vi } from 'vitest';
import { Ad } from './Ad.ts';
import {
  fireEvent,
  getAllByText,
  getByLabelText,
  getByRole,
  getByTestId,
  getByText,
  waitFor,
} from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import { createAxiosErrorMock } from '../../utils/createAxiosErrorMock.ts';

const adRequestMock = vi.hoisted(() => {
  return {
    createAd: vi.fn(),
  };
});

vi.mock('../../api/user.ts', () => {
  return {
    createAd: adRequestMock.createAd,
  };
});

describe('Create new Ad', () => {
  it('should render correctly', () => {
    const adPage = new Ad();
    const container = adPage.render();

    expect(getByText(container, 'Create new Ad')).not.toBe(null);
  });

  describe('with incorrect data', () => {
    it('should show errors and not send request', () => {
      const adPage = new Ad();

      const container = adPage.render();

      fireEvent.submit(getByTestId(container, 'form'));

      expect(
        getByText(container, 'must NOT have fewer than 6 characters'),
      ).not.toBe(null);
      expect(
        getByText(container, 'must NOT have fewer than 10 characters'),
      ).not.toBe(null);
      expect(getByText(container, 'must be number')).not.toBe(null);
      expect(
        getAllByText(container, 'must match a schema in anyOf').length,
      ).toBe(2);
      expect(
        getByText(container, 'must NOT have fewer than 4 characters'),
      ).not.toBe(null);

      expect(adRequestMock.createAd).not.toHaveBeenCalled();
    });
  });

  describe('with correct data', async () => {
    it('should send request successful', async () => {
      const adPage = new Ad();

      const container = adPage.render();

      adRequestMock.createAd.mockResolvedValue({
        data: {
          title: 'sell new car',
          description: 'sell new car Volvo X60',
          price: 40000,
          currency: 'USD',
          location: 'Dnipro',
          status: 'Public',
        },
      });

      fireEvent.change(getByLabelText(container, 'Title'), {
        target: { value: 'sell new car' },
      });
      fireEvent.change(getByLabelText(container, 'Description'), {
        target: { value: 'sell new car Volvo X60' },
      });
      fireEvent.change(getByLabelText(container, 'Price'), {
        target: { value: 40000 },
      });
      await userEvent.selectOptions(
        getByLabelText(container, 'Currency'),
        getByRole(container, 'option', { name: 'USD' }),
      );
      fireEvent.change(getByLabelText(container, 'Location'), {
        target: { value: 'Dnipro' },
      });

      await userEvent.selectOptions(
        getByLabelText(container, 'Status'),
        getByRole(container, 'option', { name: 'Public' }),
      );

      fireEvent.submit(getByTestId(container, 'form'));

      expect(adRequestMock.createAd).toHaveBeenNthCalledWith(1, {
        title: 'sell new car',
        description: 'sell new car Volvo X60',
        price: 40000,
        currency: 'USD',
        location: 'Dnipro',
        status: 'Public',
      });
    });

    it('should reject request', async () => {
      const adPage = new Ad();
      const container = adPage.render();

      const error = createAxiosErrorMock<{ message: string }>({
        message: 'BE error',
      });

      adRequestMock.createAd.mockRejectedValue(error);
      fireEvent.change(getByLabelText(container, 'Title'), {
        target: { value: 'sell new car' },
      });
      fireEvent.change(getByLabelText(container, 'Description'), {
        target: { value: 'sell new car Volvo X60' },
      });
      fireEvent.change(getByLabelText(container, 'Price'), {
        target: { value: 40000 },
      });
      await userEvent.selectOptions(
        getByLabelText(container, 'Currency'),
        getByRole(container, 'option', { name: 'USD' }),
      );
      fireEvent.change(getByLabelText(container, 'Location'), {
        target: { value: 'Dnipro' },
      });
      await userEvent.selectOptions(
        getByLabelText(container, 'Status'),
        getByRole(container, 'option', { name: 'Public' }),
      );
      fireEvent.submit(getByTestId(container, 'form'));

      expect(adRequestMock.createAd).toHaveBeenNthCalledWith(1, {
        title: 'sell new car',
        description: 'sell new car Volvo X60',
        price: 40000,
        currency: 'USD',
        location: 'Dnipro',
        status: 'Public',
      });

      await waitFor(() => {
        expect(getByText(container, 'BE error')).not.toBe(null);
      });
    });
  });
});
