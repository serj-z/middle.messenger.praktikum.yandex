import Block from '../../scripts/block';
import tmpl from './template.pug';
import { render } from '../../scripts/globalFunctions';

export default class Chats extends Block {
  constructor() {
    super('main', tmpl, {
      text: 'chats'
    });
  }
}

render('#root', new Chats());


// import { listenEvent, listenModal } from '/scripts/globalFunctions.js';

// const menu = document.querySelector('.menu');
// const close = document.querySelector('.menu__close');
// const attach = document.querySelector('.compose__attach-options');

// listenEvent(menu, 'click', function (e) {
//   e.stopPropagation();
//   this.classList.add("opened");
// });

// listenEvent(close, 'click', (e) => {
//   e.stopPropagation();
//   menu.classList.remove("opened");
// });

// listenEvent(window, 'click', (e) => {
//   e.stopPropagation();
//   menu.classList.remove("opened");
//   attach.classList.remove("opened");
// });

// listenModal('.menu__add-contact', '.add-contact');
// listenModal('.chat__contact__delete', '.delete-chat');

// listenEvent('.contacts__item', 'click', () => {
//   document.querySelector('.chat__placeholder').hidden = true;
//   document.querySelector('.chat__dialog').hidden = false;
// });

// listenEvent('.delete-chat .modal__btn', 'click', () => {
//   document.querySelector('.chat__placeholder').hidden = false;
//   document.querySelector('.chat__dialog').hidden = true;
// });

// listenEvent('.compose__attach', 'click', (e) => {
//   e.stopPropagation();
//   attach.classList.toggle("opened");
// });

// listenEvent('.modal-bg, .modal__btn', 'click', () => {
//   document.querySelectorAll('.modal').forEach(item => item.classList.remove("opened"));
// });

// listenEvent('.dynamic-label .input__field', 'keyup', function () {
//   this.setAttribute('value', this.value);
// });

// formMessage.onsubmit = (e) => {
//   e.preventDefault();
//   const formData = new FormData(formMessage);
//   const value = Object.fromEntries(formData.entries());
//   console.log(value);
// };