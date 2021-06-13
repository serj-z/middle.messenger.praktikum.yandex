import Block from './scripts/block';
import tmpl from './template.pug';
import { render } from './scripts/globalFunctions';

const contacts = [
  {
    name: 'n1',
    data: 'd1'
  },
  {
    name: 'n2',
    data: 'd2'
  },
  {
    name: 'n3',
    data: 'd3'
  },
];

export default class Main extends Block {
  constructor() {
    super('main', tmpl, {
      text: 'main'
    });
  }

  componentDidMount() {

    this.element.classList.add('new-class');

    setTimeout(() => {
      location.href = './pages/chats/index.html'
    }, 2000);
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
