import IconButton from '../../../../components/icon-btn/iconBtn';
import Block from '../../../../scripts/block';
import { logFormEntries } from '../../../../scripts/globalFunctions';
import tmpl from './template.pug';


export default class Compose extends Block {
  constructor() {
    super({
      tagName: 'div'
    }, tmpl, {
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const formMessage: HTMLFormElement = this.element.querySelector('#formMessage');
          if(!formMessage.sendMessage.value) return;
          logFormEntries(formMessage);
        }
      }
    }, {
      attach: [new IconButton({
        img: 'attach.svg',
        type: 'button',
        classList: 'compose__attach',
        events: {
          click: (e: Event) => {
            e.stopPropagation();
            document.querySelector('.compose__attach-options').classList.toggle("opened");
          }
        }
      })]
    });
  }
}