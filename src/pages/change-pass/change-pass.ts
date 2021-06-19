import { checkAuth, render, listenEvent, logFormEntries } from '../../scripts/globalFunctions';
import user from '../../data/user.json';
import Profile from '../../modules/profile/profile';
import Input from '../../modules/profile/components/input/input';
import Button from '../../components/button/button';
import Validation from '../../scripts/validation';
import { PassTypes } from '../../scripts/types';
import InputMsg from '../../components/input/inputMsg';

const v = new Validation('content', 'message');

const inputs = [{
  label: 'Old password',
  type: 'password',
  name: 'oldpass',
  rules: [v.isOldPassword(), v.isMinLength('', 5)]
}, {
  label: 'New password',
  type: 'password',
  name: 'newpass',
  rules: [v.isPassword('', PassTypes.pass), v.isMinLength('', 5)]
}, {
  label: 'Confirm new password',
  type: 'password',
  name: 'confirmpass',
  rules: [v.isConfirmPassword(), v.isMinLength('', 5)]
}];

export default class ChangePassPage extends Profile {
  constructor() {
    super({
      id: 'changePassForm',
      validation: v,
      inputs: [
        ...inputs.map(item => new Input({
          ...item,
          classList: 'dynamic-label login__input',
          disabled: false,
          bindContext: true,
          events: {
            focusout: function (e: Event) {
              v.validateField(e.currentTarget as HTMLInputElement, this);
            }
          }
        })),
        new InputMsg({classList: 'form-validation t-red'}),
        new Button({ text: 'Submit', type: 'submit', classList: 'profile__submit' })
      ],
      return: '/pages/profile/index.html'
    });
  }

  componentDidMount() {
    checkAuth(user.loggedin);
  }
}

render('#root', new ChangePassPage());

listenEvent('.modal-bg', 'click', function (e: Event) {
  if (e.target !== this) {
    return;
  }
  document.querySelectorAll('.modal-bg, .modal').forEach(item => item.classList.remove("opened"));
});