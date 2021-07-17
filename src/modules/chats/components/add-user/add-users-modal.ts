import Input from '../../../../components/input/input';
import Modal from '../../../../components/modal/modal';
import { userDTO } from '../../../../scripts/dto/dto';
import { debounce } from '../../../../scripts/globalFunctions';
import { httpPost } from '../../../../scripts/http/httpWrap';
import AddUsers from './add-users';

export const addUsersBlock = new AddUsers({ user: [] });

export default class AddUsersModal extends Modal {
  constructor() {
    super({
      content: [new Input({
        label: 'Username',
        type: 'text',
        classList: 'dynamic-label',
        name: 'login',
        events: {
          input: debounce(async (e: Event) => {
            const target = e.target as HTMLInputElement;
            const res: string = await httpPost('/user/search', {
              data: {
                login: target.value
              },
              headers: {
                'Content-type': 'application/json; charset=utf-8'
              }
            });
            const users: Array<userDTO> = JSON.parse(res);
            addUsersBlock.setProps({ users });

          }, 400) as EventListener
        }
      }), addUsersBlock],
      title: 'Add users',
      classList: 'add-users-modal'
    });
  }
}