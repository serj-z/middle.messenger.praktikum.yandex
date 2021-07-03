import { render } from '../../scripts/globalFunctions';
import Block from '../../scripts/block';

const tmpl = `.error__wrap
  img(src="/404.svg", alt=title).error__img
  h1.error__title Page not found
  a(href="/").t-purple.error__link Back to chats`;

export default class Page404 extends Block {
  constructor() {
    super({
      tagName: 'main',
      classList: 'error'
    }, tmpl);
  }
}

render('#root', new Page404());