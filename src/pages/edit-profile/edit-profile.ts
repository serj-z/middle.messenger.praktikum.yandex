import { checkAuth, render, listenEvent, logFormEntries } from '../../scripts/globalFunctions';
import user from '../../data/user.json';
import Profile from '../../modules/profile/profile';
import Input from '../../modules/profile/components/input/input';
import Button from '../../components/button/button';

const inputs = [{
  label: 'E-mail',
  type: 'email',
  name: 'email',
  disabled: false,
  value: user.email
}, {
  label: 'Username',
  type: 'text',
  name: 'username',
  disabled: false,
  value: user.username
}, {
  label: 'Firstname',
  type: 'text',
  name: 'firstname',
  disabled: false,
  value: user.firstname
}, {
  label: 'Lastname',
  type: 'text',
  name: 'lastname',
  disabled: false,
  value: user.lastname
}, {
  label: 'Displayname',
  type: 'text',
  name: 'displayname',
  disabled: false,
  value: user.displayname
}, {
  label: 'Phone',
  type: 'tel',
  name: 'phone',
  disabled: false,
  value: user.phone
}];

export default class EditProfilePage extends Profile {
  constructor() {
    super({
      id: 'editProfileForm',
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

render('#root', new EditProfilePage());

listenEvent('.modal-bg', 'click', function (e: Event) {
  if (e.target !== this) {
    return;
  }
  document.querySelectorAll('.modal-bg, .modal').forEach(item => item.classList.remove("opened"));
});


// formProfile.onsubmit = (e) => {
//   e.preventDefault();
//   const formData = new FormData(formProfile);
//   const value = Object.fromEntries(formData.entries());
//   console.log(value);
// };