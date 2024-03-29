import Block from '../../scripts/block/block';
import { router } from '../../main';
import { Props } from '../../scripts/dto/types';

export default class Link extends Block {
  constructor(props: Props) {
    super({
      tagName: 'a',
      text: props.text,
      classList: props.classList || '',
      attrs: {
        href: ''
      }
    }, props.template || '', {
      events: {
        click: (e: Event) => {
          e.preventDefault();
          router.go(props.path);
        }
      }
    });
  }
}