import Block from '../../../../scripts/block';
import { logFormEntries } from '../../../../scripts/globalFunctions';
import { Props } from '../../../../scripts/types'

export default class ProfileForm extends Block {
  constructor(props: Props) {
    super({
      tagName: props.tag || 'form',
      classList: `profile__inputs ${props.classList ? props.classList : ''}`,
      attrs: {
        id: props.id || 'profileForm'
      }
    }, `div(data-child="content")`, {
      bindContext: true,
      events: {
        submit: function (e: Event) {
          const err = props.validation.validateForm(this);
          if (err) {
            e.preventDefault();
            this.children.content[this.children.content.length - 2].setProps({ text: err });
            return;
          }
          logFormEntries(this.getContent());
        }
      },
    }, props.children);
  }
}