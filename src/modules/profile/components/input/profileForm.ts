import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/types'

export default class ProfileForm extends Block {
  constructor(props: Props) {
    super({
      tagName: props.tag || 'form',
      classList: `profile__inputs ${props.classList ? props.classList : ''}`,
      attrs: {
        id: props.id
      }
    }, `div(data-child="content")`, undefined, props.children);
  }
}