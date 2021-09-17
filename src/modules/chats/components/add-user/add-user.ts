import IconButton from '../../../../components/icon-btn/iconBtn';
import Block from '../../../../scripts/block/block';
import { Props } from '../../../../scripts/dto/types';
import { httpGet, httpPut } from '../../../../scripts/http/httpWrap';
import { chatUsersBlock } from '../chat-users/chat-users-modal';
import UserPlaceholder from '../../../../static/img/user-placeholder.png';
import AddContact from '../../../../static/img/add-contact.svg';

const template: string = `div(data-child="add").chat-users__item.add-user__item
  img(src=avatar ? 'https://ya-praktikum.tech/api/v2/resources' + avatar : '${UserPlaceholder}', alt=display_name).contact-img
  .chat-users__item__info
    h3.chat-users__item__name #{display_name ? display_name : first_name + ' ' + second_name}
    p.chat-users__item__login #{login}`;

export default class AddUser extends Block {
  constructor(props: Props) {
    super({
      tagName: 'li'
    }, template, props, {
      add: !props.isAdded ? [new IconButton({
        img: AddContact,
        type: 'button',
        title: 'Add this user to the chat',
        classList: 'chat-users__item__btn',
        events: {
          click: async (e: Event) => {
            e.stopPropagation();
            const res: string = await httpPut('/chats/users', {
              data: {
                users: [props.id],
                chatId: props.chatId
              },
              headers: {
                'Content-type': 'application/json; charset=utf-8'
              }
            });

            if (res === 'OK') {
              this.setChildren('add', []);
              const newUsers: string = await httpGet(`/chats/${chatUsersBlock.props.chatId}/users`, {
                data: undefined,
              });
              chatUsersBlock.setProps({ users: JSON.parse(newUsers) });
            } else {
              console.log('Add chat user exception', res)
            }
          }
        }
      })] : []
    });
  }
}