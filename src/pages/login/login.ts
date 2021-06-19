import { checkAuth, render, logFormEntries } from '../../scripts/globalFunctions';
import user from '../../data/user.json';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Block from '../../scripts/block';
import Validation from '../../scripts/validation';
import { PassTypes } from '../../scripts/types';
import InputMsg from '../../components/input/inputMsg';

const v = new Validation('inputs', 'message');

const inputs = [{
  label: 'Username',
  type: 'text',
  name: 'username',
  rules: [v.isUsername(), v.isMinLength('', 5)]
}, {
  label: 'Password',
  type: 'password',
  name: 'pass',
  rules: [v.isPassword('', PassTypes.pass), v.isMinLength('', 5)]
}];

const tmpl: string = `.login__form
  form(data-child="inputs button validation")#loginForm
    h1.login__headline Welcome

  a(href="/pages/signup/index.html").t-purple.login__link Sign Up`

export default class LoginPage extends Block {
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
      inputs: [
        ...inputs.map(item => new Input({
          ...item,
          classList: 'dynamic-label login__input',
          bindContext: true,
          events: {
            focusout: function (e: Event) {
              v.validateField(e.currentTarget as HTMLInputElement, this);
            }
          }
        }))
      ],
      button: [new Button({ text: 'Log in', type: 'submit', classList: 'login__submit' })],
      validation: [new InputMsg({classList: 'form-validation t-red'})]
    });
  }

  componentDidMount() {
    checkAuth(user.loggedin);
  }
}

render('#root', new LoginPage());