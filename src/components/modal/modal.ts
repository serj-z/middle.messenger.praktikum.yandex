import Block from '../../scripts/block';
import { Props } from '../../scripts/types';
import Button from '../button/button';
import tmpl from './template.pug';

export default class Modal extends Block {
  constructor(props: Props) {
    super({
      tagName: props.tag || 'form',
      classList: `modal ${props.classList ? props.classList : ''}`
    }, tmpl, props, {
      button: [new Button({text: props.btnText, type: 'submit', classList: 'modal__btn'})],
      content: props.content
    });
  }
}