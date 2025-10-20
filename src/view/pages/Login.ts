import type { Component } from '../../types/Component.ts';
import { type LoginPayload, loginSchema } from '../../schemas/login.schema.ts';
import { loginUser } from '../../api/user.ts';
import { AxiosError } from 'axios';
import {
  accessTokenStorage,
  refreshTokenStorage,
} from '../../initializers/token.ts';
import { FormInput } from '../components/FormInput/FormInput.ts';
import { Form } from '../components/Form/Form.ts';
import { Title } from '../components/Title/Title.ts';
import { Container } from '../components/Container/Container.ts';
// import { FormSelect } from '../components/FormSelect/FormSelect.ts';
// import { FormCheckbox } from '../components/FormCheckbox/FormCheckbox.ts';

export class Login implements Component {
  render() {
    const wrapper = document.createElement('div');

    const usernameInput = new FormInput({
      name: 'username',
      label: 'Username',
    });

    const passwordInput = new FormInput({
      name: 'password',
      label: 'Password',
    });

    // const selectElement = new FormSelect({
    //   name: 'currency',
    //   label: 'Currency',
    //   options: [
    //     {
    //       value: 'usd',
    //       label: 'USD',
    //     },
    //     {
    //       value: 'uan',
    //       label: 'HRYVNA',
    //     },
    //     {
    //       value: 'eur',
    //       label: 'EURO',
    //     },
    //   ],
    // });

    // const checkboxElement = new FormCheckbox({
    //   name: 'days',
    //   options: [
    //     {
    //       value: 'Monday',
    //     },
    //     {
    //       value: 'Tuesday',
    //     },
    //     {
    //       value: 'Wednesday',
    //     },
    //     {
    //       value: 'Thursday',
    //     },
    //     {
    //       value: 'Friday',
    //     },
    //     {
    //       value: 'Saturday',
    //     },
    //     {
    //       value: 'Sunday',
    //     },
    //   ],
    // });

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

    //window.currentForm = currentForm;

    const title = new Title({
      text: 'Login',
    });

    const container = new Container();

    wrapper.append(
      container.render([
        title.render(),
        currentForm.render(),
        // checkboxElement.render(),
      ]),
    );

    return wrapper;
  }
}
