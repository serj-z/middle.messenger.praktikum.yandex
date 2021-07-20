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
  label: 'Username',
  type: 'text',
  name: 'login',
  rules: [v.isUsername(), v.isMinLength('', 5)]
}, {
  label: 'Password',
  type: 'password',
  name: 'password',
  rules: [v.isPassword('', PassTypes.pass), v.isMinLength('', 5)]
}];

const tmpl: string = `.login__form(data-child="link")
  form(data-child="inputs button validation")#loginForm
    h1.login__headline Welcome
div(data-child="modals")`;

const modalsContainer = new ModalsContainer({});

export default class LoginPage extends Block {
  constructor() {
    super({
      tagName: 'main',
      classList: 'login'
    }, tmpl, {
      bindContext: true,
      events: {
        submit: async function (e: Event) {
          e.preventDefault();
          const err = v.validateForm(this);
          if (err) {
            this.children.validation[0].setProps({ text: err });
            return;
          }
          const data = getFormEntries(this.getContent().querySelector('#loginForm'));
          const res: string = await httpPost('/auth/signin', {
            data,
            headers: {
              'Content-type': 'application/json; charset=utf-8'
            }
          });
          if (res === 'OK') {
            router.setLoggedIn(true);
            router.go(Paths.ROOT);
          } else {
            const resObj: Record<string, string> = JSON.parse(res);
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
      validation: [new InputMsg({ classList: 'form-validation t-red' })],
      link: [new Link({ text: 'Sign Up', classList: 't-purple login__link', path: Paths.SIGNUP })],
      modals: [modalsContainer]
    });
  }
}