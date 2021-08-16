import Block from '../../../../scripts/block/block';
import { userDTO } from '../../../../scripts/dto/dto';
import { Props } from '../../../../scripts/dto/types';
import { chatUsersBlock } from '../chat-users/chat-users-modal';
import AddUser from './add-user';

export default class AddUsers extends Block {
  constructor(props: Props) {
    super({
      tagName: 'div'
    }, 'ul.chat-users(data-child="users")', {
      users: [],
      user: props.user,
      chatId: undefined
    });
  }

  componentDidUpdate() {
    const currentUser: userDTO = this.props.users.find((user: userDTO) => user.id === this.props.user.id);
    this.setChildren('users', this.props.users.map((user: userDTO) => new AddUser({
      ...user,
      chatId: this.props.chatId,
      currentUser: currentUser,
      isAdded: chatUsersBlock.props.users.findIndex((chatUser: userDTO) => chatUser.id === user.id) !== -1
    })));
    return true;
  }
}