import type { Component } from '../../../types/Component.ts';

export interface FormControl extends Component {
  name: string;
  setError(message: string): void;
  clearError(): void;
}
