import type { Component } from '../../../types/Component.ts';
import type { FormControl } from '../FormControl/FormControl.ts';
import { Button } from '../Button/Button.ts';
import type { Schema } from 'ajv';
import { ajv } from '../../../initializers/ajv.ts';

type FormParams<DataType> = {
  onSubmit: (data: DataType) => Promise<void>;
  validationSchema: Schema;
  controls: FormControl[];
};

export class Form<DataType> implements Component {
  formWrapperElement = document.createElement('form');
  controls: Record<string, FormControl> = {};

  constructor(params: FormParams<DataType>) {
    params.controls.forEach((control) => {
      this.formWrapperElement.append(control.render());
      this.controls[control.name] = control;
    });

    const button = new Button({
      text: 'submit',
      variant: 'info',
      type: 'submit',
    });

    this.formWrapperElement.append(button.render());

    this.formWrapperElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(this.formWrapperElement);
      const data = Object.fromEntries(formData) as DataType;

      Object.values(this.controls).forEach((control) => {
        control.clearError();
      });

      const valid = ajv.validate(params.validationSchema, data);

      if (!valid && ajv.errors) {
        ajv.errors.forEach((err) => {
          const inputName = err.instancePath.replace('/', '');

          if (!err.message) {
            return;
          }

          this.controls[inputName].setError(err.message);
        });

        return;
      }

      await params.onSubmit(data);
    });
  }

  render(): Element {
    return this.formWrapperElement;
  }
}
