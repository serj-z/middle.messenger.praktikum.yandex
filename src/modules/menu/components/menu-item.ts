import Block from '../../../scripts/block';
import tmpl from './template.pug';

export default class MenuItem extends Block {
  constructor(props) {
    super({
      tagName: 'a',
      classList: `menu__item ${props.classList ? props.classList : ''}`,
      attrs: {
        href: props.link
      }
    }, tmpl, props);
  }
}