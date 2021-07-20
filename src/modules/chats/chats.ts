import Block from '../../scripts/block/block';
import Search from './components/search/search';
import Contacts from './components/contact/contacts';
import Chat from './components/chat/chat';
import { Props } from '../../scripts/dto/types';
import { equalObjectsShallow, listenEvent } from '../../scripts/globalFunctions';

const tmpl: string = `.chats(data-child="chat")
  ul.contacts(data-child="contacts")`;
export const chat = new Chat({ user: {}, chat: {} });

export default class Chats extends Block {
  contacts: Contacts;

  constructor(props: Props) {
    super({
      tagName: 'div',
      classList: 'chats'
    }, tmpl, {
      user: {},
      search: ''
    }, {
      contacts: [new Search({
        contacts: props.contacts
      }), props.contacts],
      chat: [chat]
    });

    this.contacts = props.contacts;
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (!equalObjectsShallow(oldProps.user, newProps.user)) {
      this.contacts.setProps({ user: newProps.user });
      chat.setProps({ user: newProps.user });
    }
    return false;
  }
}

listenEvent(window, 'click', (e: Event) => {
  e.stopPropagation();
  const attach: HTMLElement = document.querySelector('.compose__attach-options')!;
  if (attach) attach.classList.remove("opened");
});