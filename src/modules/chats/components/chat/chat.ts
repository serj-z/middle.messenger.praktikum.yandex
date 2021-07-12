import IconButton from '../../../../components/icon-btn/iconBtn';
import Block from '../../../../scripts/block';
import { ChatInfo, Props } from '../../../../scripts/dto/types';
import Compose from '../compose/compose';
import { render as compile } from 'pug';
import messages from '../../../../data/messages.json';
import contacts from '../../../../data/chats.json';

export default class Chat extends Block {
  constructor(props: Props) {
    super({
      tagName: 'div',
      classList: 'chat'
    }, '', props, {
      deleteChat: [new IconButton({
        img: 'delete.svg',
        type: 'button',
        classList: 'chat__contact__delete',
        events: {
          click: (e: Event) => {
            e.stopPropagation();
            const elem: HTMLElement = document.querySelector('.delete-chat')!;
            elem.classList.add('opened');
            elem.parentElement!.classList.add('opened');
          }
        }
      })],
      compose: [new Compose()]
    });
  }

  render() {
    let template: string;
    let chatProps = null;
    if (this.props.chatId) {

      const contact = contacts.find((obj: ChatInfo) => obj.id === this.props.chatId);
      const contactMessages = messages[this.props.chatId];
      chatProps = {
        contact,
        contactMessages
      };

      template = `.chat__dialog(data-child="compose")
      .chat__contact(data-child="deleteChat")
        .chat__contact__info
          img(src='/'+contact.img, alt=contact.name).contact-img.chat__contact__img
          h3.chat__contact__name #{contact.name}
      
      .dialog
        .dialog__container
          each period in contactMessages
            p.dialog__date #{period.date}
              each m in period.messages
                div(class=\`message \${m.you ? 'message-outcoming': 'message-incoming'}\`)
                  div(class=\`message__wrap \${m.image ? 'message__img': 'message__text'}\`)
                    if m.image
                      img(src='/'+m.image, alt="")
                    else
                      | #{m.text}
                    span(class=\`message__time \${m.read ? 'message-read': ''}\`) #{m.time}`;
    } else {
      template = 'p.chat__placeholder Select a chat to send a message';
    }

    return compile(template, chatProps as any);
  }
}