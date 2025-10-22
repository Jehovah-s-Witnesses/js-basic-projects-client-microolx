import { describe, it, expect, vi } from 'vitest';
import { Ad } from './Ad.ts';
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  getByText,
  waitFor,
} from '@testing-library/dom';

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
        getByText(container, 'must NOT have fewer than 4 characters'),
      ).not.toBe(null);

      expect(adRequestMock.createAd).not.toHaveBeenCalled();
    });
  });

  describe('with correct data', () => {
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
      // fireEvent.change(getByLabelText(container, 'Currency'), {
      //   target: { value: 'USD' },
      // });
      fireEvent.change(getByLabelText(container, 'Location'), {
        target: { value: 'Dnipro' },
      });
      // fireEvent.change(getByLabelText(container, 'Status'), {
      //   target: { value: 'Public' },
      // });

      fireEvent.submit(getByTestId(container, 'form'));

      await waitFor(() => {
        expect(adRequestMock.createAd).toHaveBeenNthCalledWith(1, {
          title: 'sell new car',
          description: 'sell new car Volvo X60',
          price: '40000',
          location: 'Dnipro',
        });
      });
    });
  });
});
