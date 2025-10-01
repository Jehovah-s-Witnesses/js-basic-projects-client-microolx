export class TokenStorage {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
  set(newValue: string) {
    localStorage.setItem(this.key, newValue);
  }

  get() {
    return localStorage.getItem(this.key);
  }

  hasValue() {
    return !!this.get();
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
