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
  if(!object1 || !object2) return false;
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