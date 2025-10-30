import { describe, it, expect, vi } from 'vitest';
import { Login } from './Login.ts';
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  getByText,
  waitFor,
} from '@testing-library/dom';
import { createAxiosErrorMock } from '../../utils/createAxiosErrorMock.ts';

const userRequestMock = vi.hoisted(() => {
  return {
    loginUser: vi.fn(),
  };
});

const storageMocks = vi.hoisted(() => {
  return {
    accessTokenStorage: {
      set: vi.fn(),
    },
    refreshTokenStorage: {
      set: vi.fn(),
    },
  };
});

const locationPathMock = vi.hoisted(() => {
  return {
    Router: {
      staticRedirect: vi.fn(),
    },
  };
});

vi.mock('../../api/user.ts', () => {
  return {
    loginUser: userRequestMock.loginUser,
  };
});

vi.mock('../../initializers/token.ts', () => {
  return {
    accessTokenStorage: storageMocks.accessTokenStorage,
    refreshTokenStorage: storageMocks.refreshTokenStorage,
  };
});

vi.mock('../../router/router.ts', () => {
  return {
    Router: locationPathMock.Router,
  };
});

describe('Login', () => {
  it('should render correctly', () => {
    const loginPage = new Login();

    const container = loginPage.render();

    expect(getByText(container, 'Login')).not.toBe(null);
  });

  describe('with incorrect data', () => {
    it('should show errors and not send request', () => {
      const loginPage = new Login();

      const container = loginPage.render();

      fireEvent.submit(getByTestId(container, 'form'));

      expect(
        getByText(container, 'must NOT have fewer than 4 characters'),
      ).not.toBe(null);
      expect(
        getByText(container, 'must NOT have fewer than 8 characters'),
      ).not.toBe(null);

      expect(userRequestMock.loginUser).not.toHaveBeenCalled();
    });
  });

  describe('with correct data', () => {
    it('should send request successful', async () => {
      const loginPage = new Login();

      const container = loginPage.render();

      userRequestMock.loginUser.mockResolvedValue({
        data: { accessToken: 'access', refreshToken: 'refresh' },
      });
      fireEvent.change(getByLabelText(container, 'Username'), {
        target: { value: 'rammfall' },
      });
      fireEvent.change(getByLabelText(container, 'Password'), {
        target: { value: '12341234' },
      });
      fireEvent.submit(getByTestId(container, 'form'));

      expect(userRequestMock.loginUser).toHaveBeenNthCalledWith(1, {
        username: 'rammfall',
        password: '12341234',
      });

      await waitFor(() => {
        expect(storageMocks.accessTokenStorage.set).toHaveBeenNthCalledWith(
          1,
          'access',
        );
        expect(storageMocks.refreshTokenStorage.set).toHaveBeenNthCalledWith(
          1,
          'refresh',
        );
      });

      expect(locationPathMock.Router.staticRedirect).toHaveBeenNthCalledWith(
        1,
        '/ad',
      );
    });

    it('should reject request', async () => {
      const loginPage = new Login();

      const container = loginPage.render();

      const error = createAxiosErrorMock<{ message: string }>({
        message: 'BE error',
      });

      userRequestMock.loginUser.mockRejectedValue(error);
      fireEvent.change(getByLabelText(container, 'Username'), {
        target: { value: 'rammfall' },
      });
      fireEvent.change(getByLabelText(container, 'Password'), {
        target: { value: '12341234' },
      });
      fireEvent.submit(getByTestId(container, 'form'));

      expect(userRequestMock.loginUser).toHaveBeenNthCalledWith(1, {
        username: 'rammfall',
        password: '12341234',
      });

      await waitFor(() => {
        expect(getByText(container, 'BE error')).not.toBe(null);
      });
    });
  });
});
