import { checkAuth, render, listenEvent, logFormEntries } from '../../scripts/globalFunctions';
import user from '../../data/user.json';
import Profile from '../../modules/profile/profile';
import Input from '../../modules/profile/components/input/input';
import Button from '../../components/button/button';

const inputs = [{
  label: 'Old password',
  type: 'password',
  name: 'oldpass'
}, {
  label: 'New password',
  type: 'password',
  name: 'newpass'
}, {
  label: 'Confirm new password',
  type: 'password',
  name: 'confirmpass'
}];

export default class ChangePassPage extends Profile {
  constructor() {
    super({
      id: 'changePassForm',
      inputs: [
        ...inputs.map(item => new Input(item)),
        new Button({text: 'Submit', type: 'submit', classList: 'profile__submit'})
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


// formPassword.onsubmit = (e) => {
//   e.preventDefault();
//   const formData = new FormData(formPassword);
//   const value = Object.fromEntries(formData.entries());
//   console.log(value);
// };