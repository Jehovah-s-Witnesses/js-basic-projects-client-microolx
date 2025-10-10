import type { Component } from '../../../types/Component.ts';
import { Form_Control_Error_Classname } from './FormControl.constants.ts';

type FormControlParams = {
  type: 'input' | 'select';
  name: string;
  label: string;
};

export class FormControl implements Component {
  formControlWrapper = document.createElement('div');
  interactiveElement: HTMLInputElement | HTMLSelectElement;
  errorTextElement: HTMLElement | null;
  name: string;

  constructor(params: FormControlParams) {
    this.formControlWrapper.classList.add('field');
    const id = crypto.randomUUID();
    this.formControlWrapper.innerHTML = `<label class="label" for="${id}">${params.label}</label>`;

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

    this.formControlWrapper.append(controlWrapper);
  }

  setError(message: string) {
    if (this.errorTextElement) {
      this.errorTextElement.innerText = message;

      return;
    }

    this.errorTextElement = document.createElement('p');
    this.errorTextElement.classList.add('help', Form_Control_Error_Classname);
    this.errorTextElement.innerText = message;
    this.interactiveElement.classList.add(Form_Control_Error_Classname);

    this.formControlWrapper.append(this.errorTextElement);
  }

  clearError() {
    this.errorTextElement?.remove();
    this.errorTextElement = null;

    this.interactiveElement.classList.remove(Form_Control_Error_Classname);
  }

  render(): Element {
    return this.formControlWrapper;
  }
}
