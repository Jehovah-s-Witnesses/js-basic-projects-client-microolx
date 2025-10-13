import type { FormControl } from '../Form/Form.types.ts';
import { Form_Input_Error_Classname } from '../FormInput/FormInput.constants.ts';

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
    labelElement.innerText = params.label;
    labelElement.htmlFor = selectId;

    this.wrapperElement.append(labelElement);

    const controlElement = document.createElement('div');
    controlElement.classList.add('control');
    this.wrapperSelectElement.classList.add('select');
    controlElement.append(this.wrapperSelectElement);

    const selectElement = document.createElement('select');

    params.options.forEach(({ value, label }) => {
      const optionElement = document.createElement('option');
      optionElement.innerHTML = label;
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
      this.errorMessageElement.innerText = message;

      return;
    }

    this.wrapperSelectElement.classList.add(Form_Input_Error_Classname);

    this.errorMessageElement = document.createElement('p');
    this.errorMessageElement.classList.add('help', Form_Input_Error_Classname);
    this.errorMessageElement.innerText = message;
    this.errorMessageElement.classList.add(Form_Input_Error_Classname);

    this.wrapperElement.append(this.errorMessageElement);
  }

  clearError() {
    this.errorMessageElement?.remove();
    this.errorMessageElement = null;

    this.wrapperSelectElement.classList.add(Form_Input_Error_Classname);
  }

  render() {
    return this.wrapperElement;
  }
}
