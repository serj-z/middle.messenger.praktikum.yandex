import Block from '../../scripts/block/block';
import { Props } from '../../scripts/dto/types';

export default class Button extends Block {
  constructor(props: Props) {
    super({
      tagName: 'button',
      text: props.text,
      classList: `button ${props.classList ? props.classList : ''}`,
      attrs: {
        type: props.type
      }
    }, '', props);
  }
}