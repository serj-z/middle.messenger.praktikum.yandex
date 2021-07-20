import InputMsg from '../../../../components/input/inputMsg';
import Block from '../../../../scripts/block/block';
import { Props } from '../../../../scripts/dto/types'

const tmpl: string = `span(data-child="message").input-profile__label #{label}
input(type=type, class='input-profile__field', value=\`\${value ? value : ''}\`, name=name, disabled=disabled)`;

export default class Input extends Block {
  constructor(props: Props) {
    super({
      tagName: 'label',
      classList: `input-profile ${props.classList ? props.classList : ''}`
    }, tmpl, props, {
      message: [new InputMsg({classList: 'input-profile__msg t-red'})]
    });
  }
}