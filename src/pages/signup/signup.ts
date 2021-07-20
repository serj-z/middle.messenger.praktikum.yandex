import { getFormEntries } from '../../scripts/globalFunctions';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Block from '../../scripts/block/block';
import Validation from '../../scripts/validation';
import { PassTypes, Paths } from '../../scripts/dto/types';
import InputMsg from '../../components/input/inputMsg';
import Link from '../../components/link/link';
import { httpPost } from '../../scripts/http/httpWrap';
import { router } from '../../main';
import Notification from '../../components/notification/notification';
import ModalsContainer from '../../components/modal/modalsContainer';

const v = new Validation('inputs', 'message');

const inputs = [{
  label: 'E-mail',
  type: 'email',
  name: 'email',
  rules: [v.isEmail()]
}, {
  label: 'Username',
  type: 'text',
  name: 'login',
  rules: [v.isUsername(), v.isMinLength('', 5)]
}, {
  label: 'Firstname',
  type: 'text',
  name: 'first_name',
  rules: [v.isRequired()]
}, {
  label: 'Lastname',
  type: 'text',
  name: 'second_name',
  rules: [v.isRequired()]
}, {
  label: 'Phone',
  type: 'tel',
  name: 'phone',
  rules: [v.isPhone(), v.isMinLength(`At least 2 digits required`, 2)]
}, {
  label: 'Password',
  type: 'password',
  name: 'password',
  rules: [v.isPassword('', PassTypes.pass), v.isMinLength('', 5)]
}, {
  label: 'Confirm password',
  type: 'password',
  name: 'confirmpass',
  rules: [v.isConfirmPassword(), v.isMinLength('', 5)]
}];

const tmpl: string = `.login__form(data-child="link")
  form(data-child="inputs button validation")#signupForm
    h1.login__headline Sign Up
div(data-child="modals")`;

const modalsContainer = new ModalsContainer({});

export default class SignupPage extends Block {
  constructor() {
    super({
      tagName: 'main',
      classList: 'login'
    }, tmpl, {
      bindContext: true,
      events: {
        submit: async function (e: Event) {
          const err = v.validateForm(this);
          e.preventDefault();
          if (err) {
            this.children.validation[0].setProps({ text: err });
            return;
          }
          const data = getFormEntries(this.getContent().querySelector('#signupForm'));
          const res: string = await httpPost('/auth/signup', {
            data,
            headers: {
              'Content-type': 'application/json; charset=utf-8'
            }
          });
          const resObj: Record<string, number> = JSON.parse(res);
          if (resObj.id) {
            router.setLoggedIn(true);
            router.go(Paths.ROOT, { signedUp: true });
          } else {
            modalsContainer.setProps({ classList: 'opened' });
            modalsContainer.setChildren('modals', [new Notification({
              title: 'Error',
              btnText: 'Ok',
              classList: 'opened',
              text: resObj.reason
            })]);
          }
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
      link: [new Link({ text: 'Log in', classList: 't-purple login__link', path: Paths.LOGIN })],
      modals: [modalsContainer]
    });
  }
}