import Markup from '../../../../components/markup/markup';
import Modal from '../../../../components/modal/modal';
import { Props } from '../../../../scripts/dto/types';
import { httpDelete } from '../../../../scripts/http/httpWrap';
import { chat } from '../../chats';

export default class DeleteChat extends Modal {
  constructor(props: Props) {
    super({
      title: 'Delete chat',
      classList: 'delete-chat',
      btnText: 'Delete',
      content: [new Markup({
        template: 'p Are you sure you want to delete the chat and remove the contact?'
      })],
      events: {
        submit: async function (e: Event) {
          e.preventDefault();
          if(!chat.props.chat.id) return;
          await httpDelete('/chats', {
            data: {
              chatId: chat.props.chat.id
            },
            headers: {
              'Content-type': 'application/json; charset=utf-8'
            }
          })
          chat.setProps({ chat: {} });
          props.contacts.setProps({ search: '' });
          this.classList.remove('opened');
          this.parentElement.classList.remove('opened');
        }
      }
    });
  }
}