import Block from '../../scripts/block';
import { Props } from '../../scripts/dto/types';

export default class InputMsg extends Block {
  constructor(props?: Props) {
    super({
      tagName: 'p',
      classList: props?.classList
    }, 'span #{text}');
  }
}