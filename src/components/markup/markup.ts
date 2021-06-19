import Block from '../../scripts/block';
import { Props } from '../../scripts/types';

export default class Markup extends Block {
  constructor(props: Props) {
    super({
      tagName: props.tag || 'div',
      classList: props.classList
    }, props.template, props.props);
  }
}