import Block from '../../scripts/block';
import tmpl from './template.pug';
import { checkAuth, render, listenEvent } from '../../scripts/globalFunctions';
import user from '../../data/user.json';
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
      modals: [new AddContact(), new DeleteChat()],
    });
  }

  componentDidMount() {
    checkAuth(user.loggedin);
  }
}

render('#root', new ChatsPage());

const inputs = document.querySelectorAll('.dynamic-label .input__field');
if (inputs.length) {
  listenEvent(inputs, 'keyup', function () {
    this.setAttribute('value', this.value);
  });
}

const menu: HTMLElement = document.querySelector('.menu');

listenEvent(menu, 'click', function (e: Event) {
  e.stopPropagation();
  this.classList.add("opened");
});

listenEvent(window, 'click', (e: Event) => {
  e.stopPropagation();
  menu.classList.remove("opened");
});

listenEvent('.modal-bg', 'click', function (e: Event) {
  if (e.target !== this) {
    return;
  }
  document.querySelectorAll('.modal-bg, .modal').forEach(item => item.classList.remove("opened"));
});