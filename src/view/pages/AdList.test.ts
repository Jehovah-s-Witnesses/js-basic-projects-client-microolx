import { describe, it, expect, vi } from 'vitest';
import { OwnsAdsList } from './OwnsAdsList.ts';
import { findByText, getByText, waitFor } from '@testing-library/dom';

const adListRequestMock = vi.hoisted(() => {
  return {
    getOwnAds: vi.fn(),
  };
});

vi.mock('../../api/ad.ts', () => {
  return {
    getOwnAds: adListRequestMock.getOwnAds,
  };
});

describe('Ads List', () => {
  adListRequestMock.getOwnAds.mockResolvedValue({
    count: 3,
    data: {
      items: [
        {
          title: 'sell new car',
          description: 'sell new car Volvo X60',
          price: 40000,
          currency: 'USD',
          location: 'Dnipro',
          status: 'Public',
        },
        {
          title: 'sell new car',
          description: 'sell new car Volvo X60',
          price: 40000,
          currency: 'USD',
          location: 'Dnipro',
          status: 'Public',
        },
        {
          title: 'sell new car',
          description: 'sell new car Volvo X60',
          price: 40000,
          currency: 'USD',
          location: 'Dnipro',
          status: 'Public',
        },
      ],
    },
  });
  it('should render correctly', () => {
    const adListPage = new OwnsAdsList();
    const container = adListPage.render();

    expect(getByText(container, 'Ads List')).not.toBe(null);
  });

  describe('with correct data', async () => {
    it('should renders product from API', async () => {
      const adListPage = new OwnsAdsList();
      const container = adListPage.render();

      expect(adListRequestMock.getOwnAds).toHaveBeenNthCalledWith(1, {
        limit: 10,
        offset: 0,
      });
    });
  });

  describe('with correct items', () => {
    it('should render with correct data', async () => {
      adListRequestMock.getOwnAds.mockResolvedValue({
        count: 1,
        data: {
          items: [
            {
              title: 'sell new car',
              description: 'sell new car Volvo X60',
              price: 40000,
              currency: 'USD',
              location: 'Dnipro',
              status: 'Public',
            },
          ],
        },
      });

      const adListPage = new OwnsAdsList();
      const container = adListPage.render();

      expect(await findByText(container, 'sell new car')).not.toBe(null);

      expect(adListRequestMock.getOwnAds).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
      });
    });
  });
});
