import Block from '../../scripts/block';
import { Props } from '../../scripts/types';

export default class Button extends Block {
  constructor(props: Props) {
    super({
      tagName: 'button',
      text: props.text,
      classList: `button ${props.classList ? props.classList : ''}`,
      attrs: { type: props.type }
    }, '', props);
  }
}