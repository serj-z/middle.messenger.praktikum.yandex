import Profile from "../../modules/profile/profile";
import Link from "../../components/link/link";
import { Paths } from "../../scripts/dto/types";
import { logout } from "../../scripts/globalFunctions";
import Markup from "../../components/markup/markup";
import { userDTO } from "../../scripts/dto/dto";

const inputs = (user: userDTO) => ([
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
    name: 'login',
    disabled: true,
    value: user.login
  },
  {
    label: 'First name',
    type: 'text',
    name: 'first_name',
    disabled: true,
    value: user.first_name
  },
  {
    label: 'Last name',
    type: 'text',
    name: 'second_name',
    disabled: true,
    value: user.second_name
  },
  {
    label: 'Display name',
    type: 'text',
    name: 'display_name',
    disabled: true,
    value: user.display_name
  },
  {
    label: 'Phone',
    type: 'tel',
    name: 'phone',
    disabled: true,
    value: user.phone
  }
]);

export default class ProfilePage extends Profile {
  constructor() {
    super({
      tag: 'div',
      inputs: inputs,
      actions: [
        new Link({ text: 'Edit profile', classList: 'profile__action t-purple', path: Paths.EDIT_PROFILE }),
        new Link({ text: 'Change password', classList: 'profile__action t-purple', path: Paths.CHANGE_PASS }),
        new Markup({
          tag: 'a',
          classList: 'profile__action t-red',
          template: 'span Log out',
          props: {
            events: {
              click: async (e: Event) => {
                e.preventDefault();
                logout();
              }
            }
          }
        })
      ],
      return: Paths.ROOT
    });
  }
}