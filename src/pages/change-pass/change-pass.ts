import Profile from '../../modules/profile/profile';
import Button from '../../components/button/button';
import Validation from '../../scripts/validation';
import { PassTypes, Paths } from '../../scripts/dto/types';
import InputMsg from '../../components/input/inputMsg';
import { getFormEntries } from '../../scripts/globalFunctions';
import { httpPut } from '../../scripts/http/httpWrap';
import Notification from '../../components/notification/notification';
import Block from '../../scripts/block/block';

const v = new Validation('inputs', 'message');
const inputs = () => ([{
  label: 'Old password',
  type: 'password',
  name: 'oldPassword',
  rules: [v.isOldPassword(), v.isMinLength('', 5)]
}, {
  label: 'New password',
  type: 'password',
  name: 'newPassword',
  rules: [v.isPassword('', PassTypes.pass), v.isMinLength('', 5)]
}, {
  label: 'Confirm new password',
  type: 'password',
  name: 'confirmpass',
  rules: [v.isConfirmPassword(), v.isMinLength('', 5)]
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

export default class ChangePassPage extends Profile {
  constructor() {
    super({
      id: 'changePassForm',
      validation: v,
      inputs: inputs,
      setWarning: (notif: Block) => this.children.modals[0].setChildren('notifications', [notif]),
      submit: async function (e: Event) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const err = v.validateForm(this);
        if (err) {
          this.children.actions[0].setProps({ text: err });
          return;
        }
        this.children.actions[0].setProps({ text: '' });

        const data: any = getFormEntries(this.getContent());
        const res = await httpPut('/user/password', {
          data,
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          }
        });

        let message: Record<string, string>;
        if (res === 'OK') {
          message = {
            title: 'Success!',
            btnText: 'Ok',
            classList: 'opened',
            text: 'Password has been changed.'
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