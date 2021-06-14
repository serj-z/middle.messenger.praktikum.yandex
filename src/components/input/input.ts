import Block from '../../scripts/block';
import { Props } from '../../scripts/types';
import tmpl from './template.pug'

export default class Input extends Block {
  constructor(props: Props) {
    super({
      tagName: 'label',
      classList: `input ${props.classList ? props.classList : ''}`
    }, tmpl, props);
  }
}