import Modal from '../../../../components/modal/modal';
import { Props } from '../../../../scripts/dto/types';
import ChatUsers from './chat-users';

export const chatUsersBlock = new ChatUsers();

export default class ChatUsersModal extends Modal {
  constructor(props: Props) {
    super({
      content: [chatUsersBlock],
      title: 'Chat users',
      classList: 'chat-users-modal',
      user: props.user
    });
  }
}