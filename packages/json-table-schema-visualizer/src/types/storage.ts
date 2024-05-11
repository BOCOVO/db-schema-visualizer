abstract class Storage<T> {
  abstract getItem(key: string): object | null;
  abstract setItem(key: string, value: T): void;
  abstract removeItem(key: string): void;
}

export default Storage;
