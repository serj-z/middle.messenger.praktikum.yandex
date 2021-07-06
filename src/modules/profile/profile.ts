import Block from '../../scripts/block';
import { Props } from '../../scripts/types';
import user from '../../data/user.json';
import ChangeAvatar from './components/change-avatar/change-avatar';
import Markup from '../../components/markup/markup';
import ProfileForm from './components/input/profileForm';
import Link from '../../components/link/link';


const tmpl: string = `main(data-child="inputs").profile
  div(data-child="avatar")

  h2.profile__name #{displayname}

  div(data-child="return").return

  div(data-child="modals").modal-bg`;

const avatar: string = `.profile__avatar
  img(src=img alt=displayname class="profile__img")
  .profile__avatar-change`;

export default class Profile extends Block {
  constructor(props: Props) {
    super({
      tagName: 'div'
    }, tmpl, user, {
      inputs: [new ProfileForm({
        tag: props.tag,
        id: props.id,
        validation: props.validation,
        children: {
          content: props.inputs,
          actions: props.actions
        }
      })],
      avatar: [new Markup({
        template: avatar,
        props: {
          img: user.img,
          displayname: user.displayname,
          events: {
            click: () => {
              const modal: HTMLElement = document.querySelector('.change-avatar')!;
              modal.classList.add('opened');
              modal.parentElement!.classList.add('opened');
            }
          }
        }
      })],
      return: [new Link({ text: '', classList: 'return__link', path: props.return })],
      modals: [new ChangeAvatar()]
    });
  }
}