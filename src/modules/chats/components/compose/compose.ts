import IconButton from '../../../../components/icon-btn/iconBtn';
import Block from '../../../../scripts/block/block';

const tmpl: string = `form(method="post").compose#formMessage

  div(data-child="attach")
  
  .compose__message 
    input(type="text", name="message", placeholder="Message")#sendMessage

  button(type="submit").compose__send
  
  div(hidden).compose__attach-options
    label.attach-media Media
      input(type="file", accept="image/*", name="avatar", hidden)`;

export default class Compose extends Block {
  constructor() {
    super({
      tagName: 'div'
    }, tmpl, {}, {
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