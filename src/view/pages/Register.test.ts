import { describe, it, expect, vi } from 'vitest';
import { Register } from './Register.ts';
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
    registerUser: vi.fn(),
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

vi.mock('../../initializers/token.ts', () => {
  return {
    accessTokenStorage: storageMocks.accessTokenStorage,
    refreshTokenStorage: storageMocks.refreshTokenStorage,
  };
});

vi.mock('../../api/user.ts', () => {
  return {
    registerUser: userRequestMock.registerUser,
    loginUser: userRequestMock.loginUser,
  };
});

describe('Register', () => {
  it('should render correctly', () => {
    const registerPage = new Register();

    const container = registerPage.render();

    expect(getByText(container, 'Register')).not.toBe(null);
  });

  describe('with incorrect data', () => {
    it('should show errors and not send request', () => {
      const registerPage = new Register();

      const container = registerPage.render();

      fireEvent.submit(getByTestId(container, 'form'));

      expect(getByText(container, 'must match format "email"')).not.toBe(null);
      expect(
        getByText(container, 'must NOT have fewer than 4 characters'),
      ).not.toBe(null);
      expect(
        getByText(container, 'must NOT have fewer than 8 characters'),
      ).not.toBe(null);

      expect(userRequestMock.registerUser).not.toHaveBeenCalled();
    });
  });

  describe('with correct data', () => {
    it('should send request successful', async () => {
      const registerPage = new Register();

      const container = registerPage.render();

      userRequestMock.registerUser.mockResolvedValue({
        data: {
          email: 'alina@gmail.com',
          username: 'alinaa',
          password: 'qwerty12',
        },
      });

      userRequestMock.loginUser.mockResolvedValue({
        data: { accessToken: 'access', refreshToken: 'refresh' },
      });

      fireEvent.change(getByLabelText(container, 'Email'), {
        target: { value: 'alina@gmail.com' },
      });
      fireEvent.change(getByLabelText(container, 'Username'), {
        target: { value: 'alinaa' },
      });
      fireEvent.change(getByLabelText(container, 'Password'), {
        target: { value: 'qwerty12' },
      });
      fireEvent.submit(getByTestId(container, 'form'));

      expect(userRequestMock.registerUser).toHaveBeenNthCalledWith(1, {
        email: 'alina@gmail.com',
        username: 'alinaa',
        password: 'qwerty12',
      });

      await waitFor(() => {
        expect(userRequestMock.loginUser).toHaveBeenNthCalledWith(1, {
          email: 'alina@gmail.com',
          username: 'alinaa',
          password: 'qwerty12',
        });
        expect(storageMocks.accessTokenStorage.set).toHaveBeenNthCalledWith(
          1,
          'access',
        );
        expect(storageMocks.refreshTokenStorage.set).toHaveBeenNthCalledWith(
          1,
          'refresh',
        );
      });
    });
    ///

    it('should reject request', async () => {
      const registerPage = new Register();

      const container = registerPage.render();

      const error = createAxiosErrorMock<{ message: string }>({
        message: 'BE error',
      });

      userRequestMock.registerUser.mockRejectedValue(error);

      fireEvent.change(getByLabelText(container, 'Email'), {
        target: { value: 'alina@gmail.com' },
      });
      fireEvent.change(getByLabelText(container, 'Username'), {
        target: { value: 'alinaa' },
      });
      fireEvent.change(getByLabelText(container, 'Password'), {
        target: { value: 'qwerty12' },
      });
      fireEvent.submit(getByTestId(container, 'form'));

      expect(userRequestMock.registerUser).toHaveBeenNthCalledWith(1, {
        email: 'alina@gmail.com',
        username: 'alinaa',
        password: 'qwerty12',
      });

      await waitFor(() => {
        expect(getByText(container, 'BE error')).not.toBe(null);
      });
    });
  });
});
