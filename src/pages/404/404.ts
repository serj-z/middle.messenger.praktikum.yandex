import Block from '../../scripts/block';
import Link from '../../components/link/link';
import { Paths } from '../../scripts/dto/types';

const tmpl = `.error__wrap(data-child="link")
  img(src="/404.svg", alt=title).error__img
  h1.error__title Page not found`;

export default class Page404 extends Block {
  constructor() {
    super({
      tagName: 'main',
      classList: 'error'
    }, tmpl, undefined, {
      link: [new Link({ text: 'Back to chats', classList: 't-purple error__link', path: Paths.ROOT })]
    });
  }
}