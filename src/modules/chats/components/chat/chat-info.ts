import IconButton from '../../../../components/icon-btn/iconBtn';
import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/dto/types';

const tmpl: string = `img(src=chat.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + chat.avatar : '/chat-placeholder.png', alt=chat.title).contact-img.chat__contact__img
h3(data-child="addUser").chat__contact__name #{chat.title}`;

export default class ChatInfo extends Block {
  constructor(props: Props) {
    super({
      tagName: 'div',
      classList: 'chat__contact__info'
    }, tmpl, props, {
      addUser: [new IconButton({
        img: 'users.svg',
        type: 'button',
        title: 'Add chat users',
        classList: 'chat__contact__add-user',
        events: {
          click: (e: Event) => {
            e.stopPropagation();
            const elem: HTMLElement = document.querySelector('.add-users-modal')!;
            elem.classList.add('opened');
            elem.parentElement!.classList.add('opened');
          }
        }
      })]
    });
  }
}