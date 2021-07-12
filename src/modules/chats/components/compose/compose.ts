import IconButton from '../../../../components/icon-btn/iconBtn';
import Block from '../../../../scripts/block';
import { getFormEntries } from '../../../../scripts/globalFunctions';

const tmpl: string = `form(method="post").compose#formMessage
  
  div(data-child="attach")

  .compose__message 
    input(type="text", name="message", placeholder="Message")#sendMessage

  button(type="submit").compose__send

  div(hidden).compose__attach-options
    label.attach-media Media
      input(type="file", accept="image/*,video/*,audio/*", hidden)
    label.attach-document Document
      input(type="file", accept=".doc,.docx,.pdf", hidden)
    label.attach-location Location
      input(type="button", hidden)`;

export default class Compose extends Block {
  constructor() {
    super({
      tagName: 'div'
    }, tmpl, {
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const formMessage: HTMLFormElement | null = this.element.querySelector('#formMessage');
          if(!formMessage?.sendMessage.value) return;
          getFormEntries(formMessage);
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
            document.querySelector('.compose__attach-options')?.classList.toggle("opened");
          }
        }
      })]
    });
  }
}