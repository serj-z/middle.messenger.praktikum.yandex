import Markup from '../../../../components/markup/markup';
import Modal from '../../../../components/modal/modal';
import { chat } from '../../chats';

export default class DeleteChat extends Modal {
  constructor() {
    super({
      title: 'Delete chat',
      classList: 'delete-chat',
      btnText: 'Delete',
      content: [new Markup({
        template: 'p Are you sure you want to delete the chat and remove the contact?'
      })],
      events: {
        submit: function (e: Event) {
          e.preventDefault();
          chat.setProps({ chatId: undefined });
          this.classList.remove('opened');
          this.parentElement.classList.remove('opened');
        }
      }
    });
  }
}