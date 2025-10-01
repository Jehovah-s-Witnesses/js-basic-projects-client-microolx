import type { Component } from '../../types/Component.ts';
import { type LoginPayload, loginSchema } from '../../schemas/login.schema.ts';
import { ajv } from '../../initializers/ajv.ts';
import { loginUser } from '../../api/user.ts';
import { AxiosError } from 'axios';
import {
  accessTokenStorage,
  refreshTokenStorage,
} from '../../initializers/token.ts';

export const Login: Component = {
  render(): Element {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `<h1 class="title">Login</h1>`;

    const form = document.createElement('form');

    form.innerHTML = `
<div class="field">
  <label class="label">Username</label>
  <div class="control">
    <input class="input" type="text" name="username" placeholder="Username input">
  </div>
</div>

<div class="field password-field">
  <label class="label">Password</label>
  <div class="control">
    <input class="input" type="password"  name="password" placeholder="Password input">
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-link">Submit</button>
  </div>
</div>
    `;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData) as LoginPayload;
      const valid = ajv.validate(loginSchema, data);

      const inputWrapElement = document.querySelectorAll('.field');
      inputWrapElement.forEach((elem) => {
        elem.querySelector('.help')?.remove();
        elem.querySelector('.input')?.classList.remove('is-danger');
      });

      if (!valid) {
        ajv.errors?.forEach((err) => {
          const inputName = err.instancePath.replace('/', '');
          const inputElement = form.elements.namedItem(inputName);

          if (inputElement instanceof HTMLInputElement) {
            inputElement.classList.add('is-danger');
            const dangerText = document.createElement('p');
            dangerText.classList.add('help', 'is-danger');
            dangerText.innerText = err.message!;
            const wrapperElement = inputElement.closest('.field');

            if (!wrapperElement?.querySelector('.help')) {
              wrapperElement?.append(dangerText);
            }
          }
        });
        return;
      }

      try {
        const {
          data: { accessToken, refreshToken },
        } = await loginUser(data);
        accessTokenStorage.set(accessToken);
        refreshTokenStorage.set(refreshToken);
      } catch (err) {
        if (err instanceof AxiosError && err.response) {
          if (err.response.status === 400) {
            const inputLastElement = document.querySelector('.password-field');
            const errorWrapper = document.createElement('div');
            errorWrapper.classList.add('is-danger', 'help');
            errorWrapper.innerHTML = '';
            const textError = document.createElement('p');
            textError.innerHTML = err.response.data.message;
            errorWrapper.append(textError);
            inputLastElement?.append(errorWrapper);
          }
        }
      }
    });

    wrapper.append(form);
    return wrapper;
  },
};
