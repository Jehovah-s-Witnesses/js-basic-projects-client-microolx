import { Form_Input_Error_Classname } from './FormInput.constants.ts';
import type { FormControl } from '../Form/Form.types.ts';

type FormInputParams = {
  name: string;
  label: string;
};

export class FormInput implements FormControl {
  wrapperElement = document.createElement('div');
  interactiveElement: HTMLInputElement | HTMLSelectElement;
  errorTextElement: HTMLElement | null = null;
  name: string;

  constructor(params: FormInputParams) {
    this.wrapperElement.classList.add('field');
    const id = crypto.randomUUID();
    this.wrapperElement.innerHTML = `<label class="label" for="${id}">${params.label}</label>`;

    this.name = params.name;

    this.interactiveElement = document.createElement('input');
    this.interactiveElement.type = 'text';
    this.interactiveElement.name = params.name;
    this.interactiveElement.classList.add('input');
    this.interactiveElement.placeholder = params.label;
    this.interactiveElement.id = id;

    const controlWrapper = document.createElement('div');
    controlWrapper.classList.add('control');
    controlWrapper.append(this.interactiveElement);

    this.wrapperElement.append(controlWrapper);
  }

  setError(message: string) {
    if (this.errorTextElement) {
      this.errorTextElement.innerText = message;

      return;
    }

    this.interactiveElement.classList.add(Form_Input_Error_Classname);

    this.errorTextElement = document.createElement('p');
    this.errorTextElement.classList.add('help', Form_Input_Error_Classname);
    this.errorTextElement.innerText = message;
    this.interactiveElement.classList.add(Form_Input_Error_Classname);

    this.wrapperElement.append(this.errorTextElement);
  }

  clearError() {
    this.errorTextElement?.remove();
    this.errorTextElement = null;

    this.interactiveElement.classList.remove(Form_Input_Error_Classname);
  }

  render(): Element {
    return this.wrapperElement;
  }
}
