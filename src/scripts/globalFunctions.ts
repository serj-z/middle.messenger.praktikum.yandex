import { router } from '../main';
import Block from '../scripts/block';
import { userDTO } from './dto/dto';
import { httpGet, httpPost } from './http/httpWrap';
import { Paths } from './dto/types';

export function render(query: string, block: Block): Element {
  const root: Element = document.querySelector(query)!;
  root.append(block.getContent());
  return root;
}

export function listenEvent(selector: any, event: string, handler: Function): void {
  const elems = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
  if (!elems.length) {
    elems.addEventListener(event, handler);
    return;
  }
  for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener(event, handler);
  }
}

export function getFormEntries(form: HTMLFormElement): Record<string, string> {
  const formData = new FormData(form);
  return Array.from(formData).reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
}

export function equalObjectsShallow(object1: Record<string, any>, object2: Record<string, any>) {
  if (!object1 || !object2) return false;
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

export async function checkAuth(): Promise<void> {
  const user: userDTO = await getUser();
  if (!user.id) {
    router.setLoggedIn(false);
    router.go(Paths.LOGIN);
  } else {
    router.setLoggedIn(true);
  }
}

export async function getUser(): Promise<userDTO> {
  const res = await httpGet('/auth/user', {
    data: undefined,
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    }
  });
  return JSON.parse(res);
}

export async function logout() {
  const res = await httpPost('/auth/logout', {
    data: undefined,
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    }
  });
  if (res === 'OK') {
    router.setLoggedIn(false);
    router.go(Paths.LOGIN);
  }
}

export function debounce(func: Function, wait: number): Function {
  let timeout: number;

  return function executedFunction(...args: any): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

export function calcDateTime(date: string): string {
  const today = new Date();
  const msgTime = new Date(date);

  return msgTime.toLocaleDateString() === today.toLocaleDateString() ?
    msgTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }) :
    msgTime.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: '2-digit' });
}

export function calcChatDate(date: string): string {
  if (!date) return '';
  const today = new Date();
  const thisYear = today.getFullYear();

  const msgTime = new Date(date);
  const year: number = msgTime.getFullYear();

  if (msgTime.toLocaleDateString() === today.toLocaleDateString()) {
    return 'Today';
  } else {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    if (year !== thisYear) options.year = 'numeric';
    return msgTime.toLocaleDateString(undefined, options);
  }
}

export function getLocalTime(date: string) {
  const time = new Date(date);
  let [hour, minute] = time.toLocaleString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }).split(':');
  if (hour === '24') hour = '00';
  return `${hour}:${minute}`;
}