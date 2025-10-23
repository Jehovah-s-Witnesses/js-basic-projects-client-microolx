import type { Component } from '../../../types/Component.ts';
import { Button } from '../Button/Button.ts';
import type { Schema } from 'ajv';
import { ajv } from '../../../initializers/ajv.ts';
import type { FormControl } from './Form.types.ts';

type FormParams<DataType> = {
  onSubmit: (data: DataType) => Promise<void>;
  validationSchema: Schema;
  controls: FormControl[];
  preparationDataBeforeValidation?: (arg: DataType) => DataType;
};

export class Form<DataType> implements Component {
  formWrapperElement = document.createElement('form');
  controls: Record<string, FormControl> = {};

  constructor(params: FormParams<DataType>) {
    params.controls.forEach((control) => {
      this.formWrapperElement.append(control.render());
      this.controls[control.name] = control;
    });
    this.formWrapperElement.dataset.testid = 'form';

    const button = new Button({
      text: 'Submit',
      variant: 'info',
      type: 'submit',
    });

    this.formWrapperElement.append(button.render());

    this.formWrapperElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(this.formWrapperElement);
      const data = Object.fromEntries(formData) as DataType;
      const payload = params.preparationDataBeforeValidation
        ? params.preparationDataBeforeValidation(data)
        : data;

      Object.values(this.controls).forEach((control) => {
        control.clearError();
      });

      const valid = ajv.validate(params.validationSchema, payload);

      if (!valid && ajv.errors) {
        console.log(ajv.errors);
        ajv.errors.forEach((err) => {
          const inputName = err.instancePath.replace('/', '');

          if (!err.message) {
            return;
          }

          this.controls[inputName].setError(err.message);
        });

        return;
      }

      await params.onSubmit(payload);
    });
  }

  render() {
    return this.formWrapperElement;
  }
}
