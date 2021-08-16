import Block from '../../../../scripts/block/block';
import { Props } from '../../../../scripts/dto/types'

export default class ProfileForm extends Block {
  constructor(props: Props) {
    super({
      tagName: props.tag || 'form',
      classList: `profile__inputs ${props.classList ? props.classList : ''}`,
      attrs: {
        id: props.id || 'profileForm'
      }
    }, `div(data-child="inputs")${props.children.actions ? '\ndiv(data-child="actions").profile__actions' : ''}`, {
      bindContext: true,
      setUser: props.setUser,
      setWarning: props.setWarning,
      events: props.submit ? {
        submit: props.submit
      } : undefined,
    }, props.children);
  }
}