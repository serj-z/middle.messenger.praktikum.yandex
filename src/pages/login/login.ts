import { checkAuth, render, listenEvent, logFormEntries } from '../../scripts/globalFunctions';
import user from '../../data/user.json';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Block from '../../scripts/block';

const inputs = [{
  label: 'Username',
  type: 'text',
  name: 'username',
  classList: 'dynamic-label login__input'
}, {
  label: 'Password',
  type: 'password',
  name: 'password',
  classList: 'dynamic-label login__input'
}];

const tmpl: string = `.login__form
  form(data-child="content")#loginForm
    h1.login__headline Welcome

  a(href="/pages/signup/index.html").t-purple.login__link Sign Up`

export default class LoginPage extends Block {
  constructor() {
    super({
      tagName: 'main',
      classList: 'login'
    }, tmpl, undefined, {
      content: [
        ...inputs.map(item => new Input(item)),
        new Button({text: 'Log in', type: 'submit', classList: 'login__submit'})
      ]
    });
  }

  componentDidMount() {
    checkAuth(user.loggedin);
  }
}

render('#root', new LoginPage());

// loginForm.onsubmit = (e) => {
//   e.preventDefault();
//   const formData = new FormData(loginForm);
//   const value = Object.fromEntries(formData.entries());
//   console.log(value);

//   window.location = '/';
// };