import Block from '../../scripts/block';
import { Props } from '../../scripts/types';

export default class IconButton extends Block {
  constructor(props: Props) {
    super({
      tagName: 'button',
      classList: `icon-button ${props.classList ? props.classList : ''}`,
      attrs: {
        type: props.type,
        style: `background-image:url('/${props.img}'`
      }
    }, '', props);
  }
}