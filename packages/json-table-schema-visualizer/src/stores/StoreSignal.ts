import eventEmitter from "@/events-emitter";

export class StoreSignal<T> {
  private readonly storeEventPrefix: string;

  constructor(storeName: string) {
    this.storeEventPrefix = `store:${storeName}`;
  }

  getEventName(eventKey: string): string {
    return `${this.storeEventPrefix}:${eventKey}`;
  }

  subscribe(eventKey: string, callback: (value: T) => void): void {
    const eventName = this.getEventName(eventKey);
    eventEmitter.on(eventName, callback);
  }

  unSubscribe(eventKey: string, callback: (value: T) => void): void {
    const eventName = this.getEventName(eventKey);

    eventEmitter.off(eventName, callback);
  }

  protected emit(eventKey: string, value: T): void {
    const eventName = this.getEventName(eventKey);
    eventEmitter.emit(eventName, value);
  }
}
