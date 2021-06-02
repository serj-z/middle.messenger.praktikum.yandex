export function listenEvent(selector, event, handler) {
  const elems = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
  if (!elems.length) {
    elems.addEventListener(event, handler);
    return;
  }
  for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener(event, handler);
  }
}

export function listenModal(selector, modal) {
  listenEvent(selector, 'click', (e) => {
    e.preventDefault();
    const elem = typeof modal === 'string' ? document.querySelector(modal) : modal;
    elem.classList.add("opened");
  });
}