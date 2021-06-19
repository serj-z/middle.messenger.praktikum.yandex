import Markup from '../../../../components/markup/markup';
import Modal from '../../../../components/modal/modal';

const template: string = `form(method="post")#formAvatar
  label.avatar-label.t-purple Upload from your device
    input(type="file", accept="image/png, image/jpeg", name="avatar", id="avatar" hidden)`;

export default class ChangeAvatar extends Modal {
  constructor() {
    super({
      title: 'Upload file',
      classList: 'change-avatar',
      btnText: 'Change',
      content: [new Markup({
        template
      })],
      events: {
        submit: function (e: Event) {
          e.preventDefault();
          this.classList.remove('opened');
          this.parentElement.classList.remove('opened');
        },
        change: (event: Event) => {
          const target = event!.target as HTMLInputElement;
          const file = target!.files![0];
          const label = document.querySelector('.avatar-label');
          label!.textContent = file.name;
          label!.classList.remove('t-purple');
          console.log(file.name);
        }
      }
    });
  }
}