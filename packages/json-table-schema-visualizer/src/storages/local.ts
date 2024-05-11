import Storage from "@/types/storage";

export class AppLocalStorage<T> extends Storage<T> {
  getItem(key: string): object | null {
    const value = localStorage.getItem(key);
    if (value === null) return null;

    return JSON.parse(value);
  }

  setItem(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
