import { checkAuth, render, listenEvent, logFormEntries } from '../../scripts/globalFunctions';
import user from '../../data/user.json';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Block from '../../scripts/block';
import Validation from '../../scripts/validation';
import { PassTypes } from '../../scripts/types';

const v = new Validation();

const inputs = [{
  label: 'E-mail',
  type: 'email',
  name: 'email',
  events: {
    focusout: function(e: Event) {
      const errors = v.validateField(e.target as HTMLInputElement, [v.isEmail()]);
      this.children.message[0].setProps({text: errors});
    }
  }
}, {
  label: 'Username',
  type: 'text',
  name: 'username',
  events: {
    focusout: function(e) {
      console.log(this)
      this.setProps({label: e.target.value})
      console.log(e.target.value)
    }
  }
}, {
  label: 'Firstname',
  type: 'text',
  name: 'firstname',
  events: {
    focusout: function(e) {
      console.log(this)
      this.setProps({label: e.target.value})
      console.log(e.target.value)
    }
  }
}, {
  label: 'Lastname',
  type: 'text',
  name: 'lastname',
  events: {
    focusout: function(e) {
      console.log(this)
      this.setProps({label: e.target.value})
      console.log(e.target.value)
    }
  }
}, {
  label: 'Phone',
  type: 'tel',
  name: 'phone',
  events: {
    focusout: function(e) {
      console.log(this)
      this.setProps({label: e.target.value})
      console.log(e.target.value)
    }
  }
}, {
  label: 'Password',
  type: 'password',
  name: 'pass',
  events: {
    focusout: function(e: Event) {
      const errors = v.validateField(e.target as HTMLInputElement, [v.isPassword('', PassTypes.pass), v.isMinLength('', 5)]);
      this.children.message[0].setProps({text: errors});
    }
  }
}, {
  label: 'Confirm password',
  type: 'password',
  name: 'confirmpass',
  events: {
    focusout: function(e: Event) {
      const errors = v.validateField(e.target as HTMLInputElement, [v.isConfirmPassword(), v.isMinLength('', 5)]);
      this.children.message[0].setProps({text: errors});
    }
  }
}];

const tmpl: string = `.login__form
  form(data-child="content")#signupForm
    h1.login__headline Sign Up

  a(href="/pages/login/index.html").t-purple.login__link Log in`

export default class SignupPage extends Block {
  constructor() {
    super({
      tagName: 'main',
      classList: 'login'
    }, tmpl, undefined, {
      content: [
        ...inputs.map(item => new Input({
          ...item,
          classList: 'dynamic-label login__input',
          bindContext: true,
        })),
        new Button({text: 'Sign Up', type: 'submit', classList: 'login__submit'})
      ]
    });
  }

  componentDidMount() {
    checkAuth(user.loggedin);
  }
}

render('#root', new SignupPage());


// signupForm.onsubmit = (e) => {
//   e.preventDefault();
//   const formData = new FormData(signupForm);
//   const value = Object.fromEntries(formData.entries());
//   console.log(value);
// };