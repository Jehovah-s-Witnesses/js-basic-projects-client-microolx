import { describe, it, expect } from 'vitest';
import { getByLabelText, getByText, queryByText } from '@testing-library/dom';
import { FormInput } from './FormInput.ts';

describe('FormInput', () => {
  it('should render correctly', () => {
    const input = new FormInput({
      name: 'username',
      label: 'Username',
    });
    const container = input.render();

    expect(getByLabelText(container, 'Username')).not.toBe(null);
  });

  describe('.setError', () => {
    it('should show error text', () => {
      const input = new FormInput({
        name: 'username',
        label: 'Username',
      });
      const errorText = 'Custom error';
      const container = input.render();

      input.setError(errorText);

      expect(getByText(container, errorText)).not.toBe(null);
    });

    it('should reset error', () => {
      const input = new FormInput({
        name: 'username',
        label: 'Username',
      });
      const firstErrorText = 'Custom error';
      const secondErrorText = 'Second error';
      const container = input.render();

      input.setError(firstErrorText);

      expect(getByText(container, firstErrorText)).not.toBe(null);

      input.setError(secondErrorText);

      expect(getByText(container, secondErrorText)).not.toBe(null);
      expect(queryByText(container, firstErrorText)).toBe(null);
    });
  });

  describe('.clearError', () => {
    it('should clear error', () => {
      const input = new FormInput({
        name: 'username',
        label: 'Username',
      });
      const firstErrorText = 'Custom error';
      const container = input.render();

      input.setError(firstErrorText);

      expect(getByText(container, firstErrorText)).not.toBe(null);

      input.clearError();

      expect(queryByText(container, firstErrorText)).toBe(null);
    });
  });
});
