import Block from '../../scripts/block';
import { Props } from '../../scripts/types';
import InputMsg from './inputMsg';

const tmpl: string = `input(type=type, class='input__field', value="", name=name, onkeyup="this.setAttribute('value', this.value)")
span.input__label #{label}
div(data-child="message").input__msg`;

export default class Input extends Block {
  constructor(props: Props) {
    super({
      tagName: 'label',
      classList: `input ${props.classList ? props.classList : ''}`
    }, tmpl, props, {
      message: [new InputMsg()]
    });
  }
}