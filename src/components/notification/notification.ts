import { Props } from '../../scripts/dto/types';
import Markup from '../markup/markup';
import Modal from '../modal/modal';

export default class Notification extends Modal {
  constructor(props: Props) {
    super({
      content: [new Markup({
        template: `p ${props.text}`
      })],
      classList: props.classList,
      title: props.title,
      btnText: props.btnText,
      events: {
        submit: function (e: Event) {
          e.preventDefault();
          e.stopPropagation();
          this.parentElement.classList.remove('opened');
          this.classList.remove('opened');
        }
      }
    });
  }
}