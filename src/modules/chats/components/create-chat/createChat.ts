import Input from '../../../../components/input/input';
import Modal from '../../../../components/modal/modal';
import { Props } from '../../../../scripts/dto/types';
import { getFormEntries } from '../../../../scripts/globalFunctions';
import { httpPost } from '../../../../scripts/http/httpWrap';
import Notification from '../../../../components/notification/notification';

export default class CreateChat extends Modal {
  constructor(props: Props) {
    super({
      content: [new Input({
        label: 'Chat name',
        type: 'text',
        classList: 'dynamic-label',
        name: 'title'
      })],
      title: 'Create new chat',
      classList: 'create-chat',
      btnText: 'Create',
      events: {
        submit: async function (e: Event) {
          e.preventDefault();
          const data: Record<string, string> = getFormEntries(this);
          const res = await httpPost('/chats', {
            data,
            headers: {
              'Content-type': 'application/json; charset=utf-8'
            }
          });

          const resObj: Record<string, any> = JSON.parse(res);
          if (resObj.id) {
            props.contacts.setProps({ search: '' });
          } else {
            props.modalsContainer.setChildren('notifications', [new Notification({
              text: resObj.reson,
              title: 'Error',
              classList: 'opened',
              btnText: 'Ok',
            })]);
          }

          this.classList.remove('opened');
          this.parentElement.classList.remove('opened');
        }
      }
    });
  }
}