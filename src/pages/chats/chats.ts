import Block from '../../scripts/block';
import AddContact from '../../modules/chats/components/add-contact/add-contact';
import DeleteChat from '../../modules/chats/components/delete-chat/deleteChat';
import Chats from '../../modules/chats/chats';
import MenuItems from '../../modules/menu/menu';
import { listenEvent } from '../../scripts/globalFunctions';

const tmpl: string = `main.chats-wrap(data-child="chatsComponents")
div(data-child="modals").modal-bg`;

export default class ChatsPage extends Block {
  constructor() {
    super({
      tagName: 'div'
    }, tmpl, undefined, {
      chatsComponents: [new MenuItems(), new Chats()],
      modals: [new AddContact(), new DeleteChat()],
    });

    const modalBg: HTMLElement = this.getContent().querySelector('.modal-bg')!;

    listenEvent(modalBg, 'click', (e: Event) => {
      if (e.target !== modalBg) return;
      document.querySelectorAll('.modal-bg, .modal').forEach(item => item.classList.remove("opened"));
    });
  }
}