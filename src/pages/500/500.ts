import Block from '../../scripts/block/block';
import Link from '../../components/link/link';
import { Paths } from '../../scripts/dto/types';
import ServerErrorImg from '../../static/img/500.svg';

const tmpl = `.error__wrap(data-child="link")
  img(src="${ServerErrorImg}", alt=title).error__img
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