import { render } from '../../scripts/globalFunctions';
import Block from '../../scripts/block';

const tmpl = `.error__wrap
  img(src="/500.svg", alt=title).error__img
  h1.error__title Internal server error
  a(href="/").t-purple.error__link Back to chats`;

export default class Page500 extends Block {
  constructor() {
    super({
      tagName: 'main',
      classList: 'error'
    }, tmpl);
  }
}

render('#root', new Page500());