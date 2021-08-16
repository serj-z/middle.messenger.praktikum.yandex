import Block from '../../scripts/block/block';
import { Props } from '../../scripts/dto/types';

export default class IconButton extends Block {
  constructor(props: Props) {
    super({
      tagName: 'button',
      classList: `icon-button ${props.classList ? props.classList : ''}`,
      attrs: {
        type: props.type,
        title: props.title,
        style: `background-image:url('${props.img}')`
      }
    }, '', props);
  }
}