import type { FormControl } from '../Form/Form.types.ts';
import { Form_Input_Error_Classname } from '../FormInput/FormInput.constants.ts';

type FormCheckboxOption = {
  value: string;
};

type Params = {
  name: string;
  options: FormCheckboxOption[];
};

export class FormCheckbox implements FormControl {
  name: string;
  wrapperElement = document.createElement('div');
  errorMessageElement: HTMLParagraphElement | null = null;

  constructor(params: Params) {
    this.name = params.name;

    this.wrapperElement.classList.add('checkboxes');

    params.options.forEach(({ value }) => {
      const labelElement = document.createElement('label');
      const checkboxId = crypto.randomUUID();
      labelElement.classList.add('label');

      labelElement.htmlFor = checkboxId;

      const checkboxElement = document.createElement('input');
      checkboxElement.classList.add('checkbox');
      checkboxElement.type = 'checkbox';
      checkboxElement.name = params.name;
      checkboxElement.id = checkboxId;

      labelElement.append(checkboxElement, value);

      this.wrapperElement.append(labelElement);
    });
  }

  setError(message: string) {
    if (this.errorMessageElement) {
      this.errorMessageElement.innerText = message;

      return;
    }

    this.errorMessageElement = document.createElement('p');
    this.errorMessageElement.classList.add('help', Form_Input_Error_Classname);
    this.errorMessageElement.innerText = message;

    this.wrapperElement.append(this.errorMessageElement);
  }

  clearError() {
    this.errorMessageElement?.remove();
    this.errorMessageElement = null;
  }

  render(): Element {
    return this.wrapperElement;
  }
}
