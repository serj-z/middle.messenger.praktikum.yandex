import Block from '../../../../scripts/block';
import tmpl from './template.pug';
import { Props } from '../../../../scripts/types'

export default class Input extends Block {
  constructor(props: Props) {
    super({
      tagName: 'label',
      classList: `input-profile ${props.classList ? props.classList : ''}`
    }, tmpl, {...props});
  }
}