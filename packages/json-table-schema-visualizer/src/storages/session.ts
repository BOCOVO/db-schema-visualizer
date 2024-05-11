import Storage from "@/types/storage";

export class AppSessionStorage<T> extends Storage<T> {
  getItem(key: string): object | null {
    const value = sessionStorage.getItem(key);
    if (value === null) return null;

    return JSON.parse(value);
  }

  setItem(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
