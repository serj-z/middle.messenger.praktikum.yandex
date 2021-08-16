import Block from '../../scripts/block/block';
import { Props } from '../../scripts/dto/types';

export default class ModalsContainer extends Block {
  constructor(props: Props) {
    super({
      tagName: props.tag || 'div'
    }, 'div(data-child="modals notifications", class=\`modal-bg \${classList ? classList : ""}\`)', {
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('modal-bg')) {
            this.getContent().querySelectorAll('.modal-bg, .modal').forEach(item => item.classList.remove('opened'));
          }
        }
      }
    }, {
      modals: props.children || [],
      notifications: props.notifications || []
    });
  }
}