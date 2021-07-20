import Profile from '../../modules/profile/profile';
import Button from '../../components/button/button';
import Validation from '../../scripts/validation';
import InputMsg from '../../components/input/inputMsg';
import { Paths } from '../../scripts/dto/types';
import { userDTO } from '../../scripts/dto/dto';
import { getFormEntries } from '../../scripts/globalFunctions';
import { httpPut } from '../../scripts/http/httpWrap';
import Notification from '../../components/notification/notification';
import Block from '../../scripts/block/block';


const v = new Validation('inputs', 'message');
const inputs = (user: userDTO) => ([{
  label: 'E-mail',
  type: 'email',
  name: 'email',
  value: user.email,
  rules: [v.isEmail()],
}, {
  label: 'Username',
  type: 'text',
  name: 'login',
  value: user.login,
  rules: [v.isUsername(), v.isMinLength('', 5)],
  classList: 'dynamic-label login__input'
}, {
  label: 'First name',
  type: 'text',
  name: 'first_name',
  value: user.first_name,
  rules: [v.isRequired()],
  classList: 'dynamic-label login__input'
}, {
  label: 'Last name',
  type: 'text',
  name: 'second_name',
  value: user.second_name,
  rules: [v.isRequired()],
  classList: 'dynamic-label login__input'
}, {
  label: 'Display name',
  type: 'text',
  name: 'display_name',
  value: user.display_name
}, {
  label: 'Phone',
  type: 'tel',
  name: 'phone',
  value: user.phone,
  rules: [v.isPhone(), v.isMinLength(`At least 2 digits required`, 2)]
}].map((item) => ({
  ...item,
  classList: 'dynamic-label login__input',
  disabled: false,
  bindContext: true,
  events: {
    focusout: function (e: Event) {
      v.validateField(e.currentTarget as HTMLInputElement, this);
    }
  }
})));

export default class EditProfilePage extends Profile {
  constructor() {
    super({
      id: 'editProfileForm',
      validation: v,
      inputs: inputs,
      setWarning: (notif: Block) => this.children.modals[0].setChildren('notifications', [notif]),
      setUser: (user: userDTO) => this.setProps({ user }),
      submit: async function (e: Event) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const err = v.validateForm(this);
        if (err) {
          this.children.actions[0].setProps({ text: err });
          return;
        }

        const data = getFormEntries(this.getContent());
        const res = await httpPut('/user/profile', {
          data,
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          }
        });
        const user = JSON.parse(res);
        let message: Record<string, string>;

        if (user.id) {
          this.props.setUser(user);
          message = {
            title: 'Success!',
            btnText: 'Ok',
            classList: 'opened',
            text: 'Info has been updated.'
          };
        } else {
          const resObj: Record<string, string> = JSON.parse(res);
          message = {
            title: 'Error',
            btnText: 'Ok',
            classList: 'opened',
            text: resObj.reason
          };
        }

        const warning: Block = new Notification(message);

        this.props.setWarning(warning);
        warning.getContent().parentElement?.classList.add('opened');

      },
      actions: [
        new InputMsg({ classList: 'form-validation t-red' }),
        new Button({ text: 'Submit', type: 'submit', classList: 'profile__submit' })
      ],
      return: Paths.PROFILE
    });
  }
}