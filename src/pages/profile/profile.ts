import user from "../../data/user.json";
import Profile from "../../modules/profile/profile";
import Input from "../../modules/profile/components/input/input";
import Link from "../../components/link/link";
import { Paths } from "../../scripts/types";
import { listenEvent } from "../../scripts/globalFunctions";

const inputs = [
  {
    label: 'E-mail',
    type: 'email',
    name: 'email',
    disabled: true,
    value: user.email
  },
  {
    label: 'Username',
    type: 'text',
    name: 'username',
    disabled: true,
    value: user.username
  },
  {
    label: 'E-mail',
    type: 'text',
    name: 'Firstname',
    disabled: true,
    value: user.firstname
  },
  {
    label: 'Lastname',
    type: 'text',
    name: 'lastname',
    disabled: true,
    value: user.lastname
  },
  {
    label: 'Displayname',
    type: 'text',
    name: 'displayname',
    disabled: true,
    value: user.displayname
  },
  {
    label: 'Phone',
    type: 'tel',
    name: 'phone',
    disabled: true,
    value: user.phone
  }
];

const actions = [
  { text: 'Edit profile', classList: 'profile__action t-purple', path: Paths.EDIT_PROFILE },
  { text: 'Change password', classList: 'profile__action t-purple', path: Paths.CHANGE_PASS },
  { text: 'Log out', classList: 'profile__action t-red', path: Paths.LOGIN }
]

export default class ProfilePage extends Profile {
  constructor() {
    super({
      tag: 'div',
      inputs: inputs.map((item) => new Input(item)),
      actions: actions.map((item) => new Link(item)),
      return: Paths.ROOT
    });

    const modalBg: HTMLElement = this.getContent().querySelector('.modal-bg')!;

    listenEvent(modalBg, 'click', (e: Event) => {
      if (e.target !== modalBg) return;
      document.querySelectorAll('.modal-bg, .modal').forEach(item => item.classList.remove("opened"));
    });
  }
}