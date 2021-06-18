import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/types'

const tmpl: string = `span.input-profile__label #{label}
input(type=type, class='input-profile__field', value=\`\${value ? value : ''}\`, name=name, disabled=disabled)`;

export default class Input extends Block {
  constructor(props: Props) {
    super({
      tagName: 'label',
      classList: `input-profile ${props.classList ? props.classList : ''}`
    }, tmpl, props);
  }
}