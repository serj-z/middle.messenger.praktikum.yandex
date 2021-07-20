import Markup from '../../../../components/markup/markup';
import Modal from '../../../../components/modal/modal';
import { userDTO } from '../../../../scripts/dto/dto';
import { Props } from '../../../../scripts/dto/types';
import { httpPut } from '../../../../scripts/http/httpWrap';

const template: string = `form(method="post")#formAvatar
  label(for="avatar").avatar-label.t-purple Upload from your device
  input(type="file", accept="image/png, image/jpeg", name="avatar", id="avatar" hidden)`;

export default class ChangeAvatar extends Modal {
  constructor(props: Props) {
    super({
      title: 'Upload file',
      classList: 'change-avatar',
      btnText: 'Change',
      content: [new Markup({
        template
      })],
      events: {
        submit: async function (e: Event) {
          e.preventDefault();
          const input: HTMLInputElement = this.querySelector('#avatar')!;
          this.classList.remove('opened');
          this.parentElement.classList.remove('opened');
          if (!input.files?.length) return;
          try {
            const data = new FormData();
            data.append('avatar', input.files[0]);
            const res = await httpPut('/user/profile/avatar', { data });
            const user: userDTO = JSON.parse(res);
            if (user.avatar) {
              props.setAvatar(user.avatar);
              const label = document.querySelector('.avatar-label');
              label!.textContent = 'Upload from your device';
              label!.classList.add('t-purple');
            }
          } catch (err) {
            console.log('Error', err);
          }
        },
        change: (e: Event) => {
          const target = e.target as HTMLInputElement;
          if (!target.files?.length) return;
          const file = target.files[0];
          const label = document.querySelector('.avatar-label');
          label!.textContent = file.name;
          label!.classList.remove('t-purple');
        }
      }
    });
  }
}