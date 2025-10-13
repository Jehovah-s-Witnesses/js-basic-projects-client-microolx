import type { Component } from '../../types/Component.ts';
import {
  type RegisterPayload,
  registerSchema,
} from '../../schemas/register.schema.ts';
import { loginUser, registerUser } from '../../api/user.ts';
import { ajv } from '../../initializers/ajv.ts';
import { AxiosError } from 'axios';
import {
  accessTokenStorage,
  refreshTokenStorage,
} from '../../initializers/token.ts';
import { FormInput } from '../components/FormInput/FormInput.ts';
import { Form } from '../components/Form/Form.ts';
import { Title } from '../components/Title/Title.ts';
import { Container } from '../components/Container/Container.ts';

export const Register: Component = {
  render(): Element {
    const wrapper = document.createElement('div');

    const emailInput = new FormInput({
      name: 'email',
      label: 'Email',
    });

    const usernameInput = new FormInput({
      name: 'username',
      label: 'username',
    });

    const passwordInput = new FormInput({
      name: 'password',
      label: 'Password',
    });

    const container = new Container();

    const title = new Title({
      text: 'Register',
    });

    const currentForm = new Form<RegisterPayload>({
      onSubmit: async (data) => {
        try {
          await registerUser(data);
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
      validationSchema: registerSchema,
      controls: [emailInput, usernameInput, passwordInput],
    });

    wrapper.append(container.render([title.render(), currentForm.render()]));

    return wrapper;
  },
};
