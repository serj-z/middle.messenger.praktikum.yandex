import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/types';
import { render as compile } from 'pug';
import Contact from './contact';
import { chat } from '../../chats';

export default class Contacts extends Block {
  constructor(props: Props) {
    super({
      tagName: 'li'
    }, '', props, {
      contact: props.chats.map((chat: any) => new Contact({
        ...chat,
        setChat: () => this.setProps({chatId: chat.id})
      }))
    }
    );
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if(oldProps.chatId !== newProps.chatId) {
      chat.setProps({chatId: newProps.chatId});
      return false;
    }
    return true;
  }

  render() {
    return compile(`ul(data-child="contact")`);
  }
}