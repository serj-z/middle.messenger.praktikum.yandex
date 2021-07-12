import { IEventBus, Listener } from './dto/types';

export default class EventBus implements IEventBus {

  listeners: Listener;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    const index = this.listeners[event].indexOf(callback);
    if (index === -1) {
      throw new Error(`Коллбэк ${callback} не подписан на событие ${event}`);
    }

    this.listeners[event].splice(index, 1);
  }

  emit(event: string, ...args: any): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}