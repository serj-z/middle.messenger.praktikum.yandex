import Block from '../../scripts/block';
import { Props } from '../../scripts/dto/types';
import Button from '../button/button';

const tmpl: string = `div(data-child='button').modal__container
  h2.modal__title #{title}
  div(data-child='content').modal__content`;

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