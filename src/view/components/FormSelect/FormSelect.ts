import type { FormControl } from '../Form/Form.types.ts';
import { IS_ERROR_CLASSNAME } from '../Constants/constants.ts';

type FormSelectOption = {
  value: string;
  label: string;
};

type Params = {
  name: string;
  label: string;
  options: FormSelectOption[];
};

export class FormSelect implements FormControl {
  name: string;
  wrapperElement = document.createElement('div');
  wrapperSelectElement = document.createElement('div');
  errorMessageElement: null | HTMLParagraphElement = null;

  constructor(params: Params) {
    this.name = params.name;

    this.wrapperElement.classList.add('field');

    const labelElement = document.createElement('label');
    const selectId = crypto.randomUUID();

    labelElement.classList.add('label');
    labelElement.textContent = params.label;
    labelElement.htmlFor = selectId;

    this.wrapperElement.append(labelElement);

    const controlElement = document.createElement('div');
    controlElement.classList.add('control');
    this.wrapperSelectElement.classList.add('select');
    controlElement.append(this.wrapperSelectElement);

    const selectElement = document.createElement('select');

    params.options.forEach(({ value, label }) => {
      const optionElement = document.createElement('option');
      optionElement.textContent = label;
      optionElement.value = value;

      selectElement.append(optionElement);
    });
    selectElement.name = params.name;
    selectElement.id = selectId;
    this.wrapperSelectElement.append(selectElement);

    this.wrapperElement.append(controlElement);
  }

  setError(message: string) {
    if (this.errorMessageElement) {
      this.errorMessageElement.textContent = message;

      return;
    }

    this.wrapperSelectElement.classList.add(IS_ERROR_CLASSNAME);

    this.errorMessageElement = document.createElement('p');
    this.errorMessageElement.classList.add('help', IS_ERROR_CLASSNAME);
    this.errorMessageElement.textContent = message;

    this.wrapperElement.append(this.errorMessageElement);
  }

  clearError() {
    this.errorMessageElement?.remove();
    this.errorMessageElement = null;

    this.wrapperSelectElement.classList.remove(IS_ERROR_CLASSNAME);
  }

  render() {
    return this.wrapperElement;
  }
}
