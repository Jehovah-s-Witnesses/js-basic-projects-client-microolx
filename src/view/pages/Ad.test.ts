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
import { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { userEvent } from '@testing-library/user-event';

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
          price: '40000',
          location: 'Dnipro',
        },
      });

      fireEvent.change(getByLabelText(container, 'Title'), {
        target: { value: 'sell new car' },
      });
      fireEvent.change(getByLabelText(container, 'Description'), {
        target: { value: 'sell new car Volvo X60' },
      });
      fireEvent.change(getByLabelText(container, 'Price'), {
        target: { value: '40000' },
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
      // fireEvent.select(getByLabelText(container, 'Status'), {
      //   target: { value: 'Public' },
      // });

      fireEvent.submit(getByTestId(container, 'form'));

      await waitFor(() => {
        expect(adRequestMock.createAd).toHaveBeenNthCalledWith(1, {
          title: 'sell new car',
          description: 'sell new car Volvo X60',
          price: 40000,
          currency: 'usd',
          location: 'Dnipro',
          status: 'public',
        });
      });
    });

    it('should reject request', async () => {
      const adPage = new Ad();
      const container = adPage.render();

      const error = new AxiosError<{ message: string }>(
        undefined,
        undefined,
        undefined,
        undefined,
        {
          config: {} as InternalAxiosRequestConfig,
          headers: {},
          request: undefined,
          status: 400,
          statusText: '',
          data: {
            message: 'BE error',
          },
        },
      );

      adRequestMock.createAd.mockRejectedValue(error);
      fireEvent.change(getByLabelText(container, 'Title'), {
        target: { value: 'sell new car' },
      });
      fireEvent.change(getByLabelText(container, 'Description'), {
        target: { value: 'sell new car Volvo X60' },
      });
      fireEvent.change(getByLabelText(container, 'Price'), {
        target: { value: '40000' },
      });
      fireEvent.change(getByLabelText(container, 'Currency'), {
        target: { value: 'USD' },
      });
      fireEvent.change(getByLabelText(container, 'Location'), {
        target: { value: 'Dnipro' },
      });
      fireEvent.change(getByLabelText(container, 'Status'), {
        target: { value: 'Public' },
      });

      await waitFor(() => {
        expect(getByText(container, 'BE error')).not.toBe(null);
      });
    });
  });
});
