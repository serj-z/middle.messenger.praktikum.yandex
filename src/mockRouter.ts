import Block from './scripts/block';
import { render } from './scripts/globalFunctions';
import { checkAuth } from './scripts/globalFunctions';
import user from './data/user.json';

class Main extends Block {
  constructor() {
    super(undefined, '', {
      auth: user.loggedin
    });
  }

  componentDidMount() {
    checkAuth(this.props.auth);
    if(this.props.auth) location.href = './pages/chats/index.html';
  }
}

render('#root', new Main());


// import { listenEvent } from '/scripts/globalFunctions.js';

// const modalButtons = document.querySelectorAll('.modal-bg, .modal__btn');
// if(modalButtons.length) {
//   listenEvent(modalButtons, 'click', () => {
//     document.querySelectorAll('.modal').forEach(item => item.classList.remove("opened"));
//   });
// }

// const inputs = document.querySelectorAll('.dynamic-label .input__field');
// if(inputs.length) {
//   listenEvent(inputs, 'keyup', function() {
//     this.setAttribute('value', this.value);
//   });
// }
