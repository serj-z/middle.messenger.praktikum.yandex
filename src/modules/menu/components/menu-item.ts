import Block from '../../../scripts/block';
import { Props } from '../../../scripts/types';

const tmpl: string = `img(src=img, alt=text).menu__item__img
span #{text}`;

export default class MenuItem extends Block {
  constructor(props: Props) {
    super({
      tagName: 'a',
      classList: `menu__item ${props.classList ? props.classList : ''}`,
      attrs: {
        href: props.link
      }
    }, tmpl, props);
  }
}