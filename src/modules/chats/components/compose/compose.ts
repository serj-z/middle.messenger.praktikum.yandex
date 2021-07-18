import Block from '../../../../scripts/block';

const tmpl: string = `form(method="post").compose#formMessage
  
  .compose__message 
    input(type="text", name="message", placeholder="Message")#sendMessage

  button(type="submit").compose__send`;

export default class Compose extends Block {
  constructor() {
    super({
      tagName: 'div'
    }, tmpl, {});
  }
}