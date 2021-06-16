import Input from '../../../../components/input/input';
// import tmpl from './template.pug';
import Modal from '../../../../components/modal/modal';
import { logFormEntries } from '../../../../scripts/globalFunctions';

export default class AddContact extends Modal {
  constructor() {
    super({
      content: [new Input({
        label: 'Username',
        type: 'text',
        classList: 'dynamic-label',
        name: 'add-contact'
      })],
      title: 'Add contact',
      classList: 'add-contact',
      btnText: 'Submit',
      events: {
        submit: function (e: Event) {
          e.preventDefault();
          logFormEntries(this);
          this.classList.remove('opened');
          this.parentElement.classList.remove('opened');
        }
      }
    });
  }
}