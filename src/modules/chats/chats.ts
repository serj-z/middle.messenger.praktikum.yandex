import Block from '../../scripts/block';
import Search from './components/search/search';
import tmpl from './template.pug';
import chats from '../../data/chats.json';
import Contact from './components/contact/contact';

export default class Chats extends Block {
  constructor() {
    super({
      tagName: 'div',
      classList: 'chats'
    }, tmpl, undefined, {
      contacts: [new Search(), ...chats.map(chat => new Contact(chat))],
    });
  }
}