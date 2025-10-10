import type { Component } from '../../types/Component.ts';
import { type LoginPayload, loginSchema } from '../../schemas/login.schema.ts';
import { ajv } from '../../initializers/ajv.ts';
import { loginUser } from '../../api/user.ts';
import { AxiosError } from 'axios';
import {
  accessTokenStorage,
  refreshTokenStorage,
} from '../../initializers/token.ts';
import { FormControl } from '../components/FormControl/FormControl.ts';
import { Form } from '../components/Form/Form.ts';

export const Login: Component = {
  render(): Element {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `<h1 class="title">Login</h1>`;

    const usernameInput = new FormControl({
      type: 'input',
      name: 'username',
      label: 'Username',
    });

    const passwordInput = new FormControl({
      type: 'input',
      name: 'password',
      label: 'Password',
    });

    const currentForm = new Form<LoginPayload>({
      onSubmit: async (data) => {
        try {
          const {
            data: { accessToken, refreshToken },
          } = await loginUser(data);
          accessTokenStorage.set(accessToken);
          refreshTokenStorage.set(refreshToken);
        } catch (err) {
          if (err instanceof AxiosError && err.response) {
            if (err.response.status === 400) {
              passwordInput.setError(err.response.data.message);
            }
          }
        }
      },
      validationSchema: loginSchema,
      controls: [usernameInput, passwordInput],
    });

    window.currentForm = currentForm;

    wrapper.append(currentForm.render());

    return wrapper;
  },
};
