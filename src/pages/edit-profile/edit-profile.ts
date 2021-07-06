import user from '../../data/user.json';
import Profile from '../../modules/profile/profile';
import Input from '../../modules/profile/components/input/input';
import Button from '../../components/button/button';
import Validation from '../../scripts/validation';
import InputMsg from '../../components/input/inputMsg';
import { Paths } from '../../scripts/types';

const v = new Validation('content', 'message');

const inputs = [{
  label: 'E-mail',
  type: 'email',
  name: 'email',
  value: user.email,
  rules: [v.isEmail()]
}, {
  label: 'Username',
  type: 'text',
  name: 'username',
  value: user.username,
  rules: [v.isUsername(), v.isMinLength('', 5)]
}, {
  label: 'Firstname',
  type: 'text',
  name: 'firstname',
  value: user.firstname,
  rules: [v.isRequired()]
}, {
  label: 'Lastname',
  type: 'text',
  name: 'lastname',
  value: user.lastname,
  rules: [v.isRequired()]
}, {
  label: 'Displayname',
  type: 'text',
  name: 'displayname',
  value: user.displayname,
  rules: [v.isMinLength('', 2)]
}, {
  label: 'Phone',
  type: 'tel',
  name: 'phone',
  value: user.phone,
  rules: [v.isPhone(), v.isMinLength(`At least 2 digits required`, 2)]
}];

export default class EditProfilePage extends Profile {
  constructor() {
    super({
      id: 'editProfileForm',
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
        new InputMsg({ classList: 'form-validation t-red' }),
        new Button({ text: 'Submit', type: 'submit', classList: 'profile__submit' })
      ],
      return: Paths.PROFILE
    });
  }
}

// listenEvent('.modal-bg', 'click', function (e: Event) {
//   if (e.target !== this) {
//     return;
//   }
//   document.querySelectorAll('.modal-bg, .modal').forEach(item => item.classList.remove("opened"));
// });