import IconButton from '../../../../components/icon-btn/iconBtn';
import Block from '../../../../scripts/block/block';
import { userDTO } from '../../../../scripts/dto/dto';
import { Props } from '../../../../scripts/dto/types';
import { httpDelete } from '../../../../scripts/http/httpWrap';
import { chat } from '../../chats';
import { chatUsersBlock } from './chat-users-modal';

const template: string = `div(data-child="delete").chat-users__item
  img(src=avatar ? 'https://ya-praktikum.tech/api/v2/resources' + avatar : '/user-placeholder.png', alt=display_name).contact-img
  .chat-users__item__info
    h3.chat-users__item__name #{display_name ? display_name : first_name + ' ' + second_name}
    p.chat-users__item__login #{login}`;

export default class ChatUser extends Block {
  constructor(props: Props) {
    super({
      tagName: 'li'
    }, template, props, {
      delete: props.currentUser.role === 'admin' || props.currentUser.id === props.id ? [new IconButton({
        img: 'cross.svg',
        type: 'button',
        title: 'Remove this user from the chat',
        classList: 'chat-users__item__btn',
        events: {
          click: async (e: Event) => {
            e.stopPropagation();
            const res: string = await httpDelete('/chats/users', {
              data: {
                users: [props.id],
                chatId: props.chatId
              },
              headers: {
                'Content-type': 'application/json; charset=utf-8'
              }
            });

            if (res === 'OK') {

              if (props.currentUser.id === props.id) {
                chatUsersBlock.setProps({ quitChat: true });
                chat.setProps({ chat: {} });
                const modal: HTMLElement = document.querySelector('.chat-users-modal')!;
                modal.classList.remove('opened');
                modal.parentElement!.classList.remove('opened');
                return;
              }

              const newUsers: Array<userDTO> = chatUsersBlock.props.users.filter((_: userDTO, i: number) => props.index !== i);
              chatUsersBlock.setProps({ users: newUsers });
            } else {
              console.log('Delete chat user exception', res)
            }
          }
        }
      })] : []
    });
  }
}