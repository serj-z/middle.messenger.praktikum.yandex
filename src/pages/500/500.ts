import Block from '../../scripts/block';
import Link from '../../components/link/link';
import { Paths } from '../../scripts/types';

const tmpl = `.error__wrap(data-child="link")
  img(src="/500.svg", alt=title).error__img
  h1.error__title Internal server error`;

export default class Page500 extends Block {
  constructor() {
    super({
      tagName: 'main',
      classList: 'error'
    }, tmpl, undefined, {
      link: [new Link({ text: 'Back to chats', classList: 't-purple error__link', path: Paths.ROOT })]
    });
  }
}