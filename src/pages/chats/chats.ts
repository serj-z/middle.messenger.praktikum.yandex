import Block from '../../scripts/block';
import tmpl from './template.pug';
import { checkAuth, render, listenEvent, listenModal } from '../../scripts/globalFunctions';
import user from '../../data/user.json';
import Modal from '../../components/modal/modal';
import AddContact from '../../modules/chats/components/add-contact/add-contact';
import DeleteChat from '../../modules/chats/components/delete-chat/deleteChat';
import Chats from '../../modules/chats/chats';
import MenuItems from '../../modules/menu/menu';

export default class ChatsPage extends Block {
  constructor() {
    super({
      tagName: 'div'
    }, tmpl, undefined, {
      chatsComponents: [new MenuItems(), new Chats()],
      modals: [
        new Modal({
          title: 'Add contact',
          content: [new AddContact()]
        }),
        new Modal({
          title: 'Delete chat',
          content: [new DeleteChat()]
        }),
      ],
    });
  }

  componentDidMount() {
    checkAuth(user.loggedin);
  }
}

render('#root', new ChatsPage());

const inputs = document.querySelectorAll('.dynamic-label .input__field');
if(inputs.length) {
  listenEvent(inputs, 'keyup', function() {
    this.setAttribute('value', this.value);
  });
}


const menu: HTMLElement = document.querySelector('.menu');
// const close: HTMLElement = document.querySelector('.menu__close');
const attach: HTMLElement = document.querySelector('.compose__attach-options');

listenEvent(menu, 'click', function (e: Event) {
  e.stopPropagation();
  this.classList.add("opened");
});

// listenEvent(close, 'click', (e) => {
//   e.stopPropagation();
//   menu.classList.remove("opened");
// });

listenEvent(window, 'click', (e: Event) => {
  e.stopPropagation();
  menu.classList.remove("opened");
  attach.classList.remove("opened");
});

listenModal('.menu__add-contact', '.add-contact');
listenModal('.chat__contact__delete', '.delete-chat');

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