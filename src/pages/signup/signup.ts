import { logFormEntries } from '../../scripts/globalFunctions';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Block from '../../scripts/block';
import Validation from '../../scripts/validation';
import { PassTypes, Paths } from '../../scripts/types';
import InputMsg from '../../components/input/inputMsg';
import Link from '../../components/link/link';

const v = new Validation('inputs', 'message');

const inputs = [{
  label: 'E-mail',
  type: 'email',
  name: 'email',
  rules: [v.isEmail()]
}, {
  label: 'Username',
  type: 'text',
  name: 'username',
  rules: [v.isUsername(), v.isMinLength('', 5)]
}, {
  label: 'Firstname',
  type: 'text',
  name: 'firstname',
  rules: [v.isRequired()]
}, {
  label: 'Lastname',
  type: 'text',
  name: 'lastname',
  rules: [v.isRequired()]
}, {
  label: 'Phone',
  type: 'tel',
  name: 'phone',
  rules: [v.isPhone(), v.isMinLength(`At least 2 digits required`, 2)]
}, {
  label: 'Password',
  type: 'password',
  name: 'pass',
  rules: [v.isPassword('', PassTypes.pass), v.isMinLength('', 5)]
}, {
  label: 'Confirm password',
  type: 'password',
  name: 'confirmpass',
  rules: [v.isConfirmPassword(), v.isMinLength('', 5)]
}];

const tmpl: string = `.login__form(data-child="link")
  form(data-child="inputs button validation")#signupForm
    h1.login__headline Sign Up`

export default class SignupPage extends Block {
  constructor() {
    super({
      tagName: 'main',
      classList: 'login'
    }, tmpl, {
      bindContext: true,
      events: {
        submit: function (e: Event) {
          const err = v.validateForm(this);
          if (err) {
            e.preventDefault();
            this.children.validation[0].setProps({ text: err });
            return;
          }
          logFormEntries(this.getContent());
        }
      }
    }, {
      inputs: inputs.map(item => new Input({
        ...item,
        classList: 'dynamic-label login__input',
        bindContext: true,
        events: {
          focusout: function (e: Event) {
            v.validateField(e.currentTarget as HTMLInputElement, this);
          }
        }
      })),
      button: [new Button({ text: 'Sign Up', type: 'submit', classList: 'login__submit' })],
      validation: [new InputMsg({ classList: 'form-validation t-red' })],
      link: [new Link({ text: 'Log in', classList: 't-purple login__link', path: Paths.LOGIN })]
    });
  }
}