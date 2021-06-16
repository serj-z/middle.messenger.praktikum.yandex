import Block from '../../scripts/block';
import Search from './components/search/search';
import tmpl from './template.pug';
import chats from '../../data/chats.json';
import Contacts from './components/contact/contacts';
import Chat from './components/chat/chat';
import { Props } from '../../scripts/types';
import { listenEvent } from '../../scripts/globalFunctions';
import Contact from './components/contact/contact';

export const chat = new Chat({ chatId: undefined });

export default class Chats extends Block {
  contacts: Contacts;

  constructor() {
    const contacts = new Contacts({ chats, search: undefined });

    super({
      tagName: 'div',
      classList: 'chats'
    }, tmpl, {}, {
      contacts: [new Search({
        searchContacts: (search: string) => this.setProps({ search })
      }), contacts],
      chat: [chat]
    });

    this.contacts = contacts;
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps.search !== newProps.search) {
      const filteredChats = chats.filter(item => item.name.toLowerCase().includes(newProps.search.toLowerCase()));
      this.contacts.setChildren('contact', filteredChats.map(chat => new Contact({
        ...chat,
        setChat: () => this.contacts.setProps({ chatId: chat.id })
      })));
    }
    return false;
  }
}

listenEvent(window, 'click', (e: Event) => {
  e.stopPropagation();
  const attach: HTMLElement = document.querySelector('.compose__attach-options')
  if (attach) attach.classList.remove("opened");
});