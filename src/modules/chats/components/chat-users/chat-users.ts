import IconButton from '../../../../components/icon-btn/iconBtn';
import Block from '../../../../scripts/block';
import { userDTO } from '../../../../scripts/dto/dto';
import { Props } from '../../../../scripts/dto/types';
import { chat } from '../../chats';
import ChatUser from './chat-user';

export default class ChatUsers extends Block {
  constructor() {
    super({
      tagName: 'div'
    }, 'ul.chat-users(data-child="users")', {
      users: [],
      chatId: undefined
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {

    if (newProps.quitChat) {
      this.props.contacts.setProps({ search: '' });
    }

    if (newProps.chatId && oldProps.chatId === newProps.chatId && oldProps.users.length === newProps.users.length) return false;
    const userIndex: number = newProps.users.findIndex((user: userDTO) => user.id === this.props.user.id);
    if (userIndex === -1) return false;
    const currentUser: userDTO = newProps.users.splice(userIndex, 1)[0];

    if (currentUser.role === 'admin') {
      chat.setChildren('deleteChat', [new IconButton({
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
      })]);
    }
    chat.setProps({ users: newProps.users });

    newProps.users.splice(0, 0, currentUser);

    this.setChildren('users', newProps.users.map((user: userDTO, index: number) => new ChatUser({
      ...user,
      index,
      chatId: newProps.chatId,
      currentUser
    })));
    return true;
  }
}