import Block from '../scripts/block';

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

export function logFormEntries(form: HTMLFormElement) {
  const formData = new FormData(form);
  const value = Array.from(formData).reduce((obj, [k, v]) => ({...obj, [k]: v}), {});
  console.log(value);
}