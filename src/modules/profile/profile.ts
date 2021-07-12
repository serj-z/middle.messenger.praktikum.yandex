import Block from '../../scripts/block';
import { Props } from '../../scripts/dto/types';
import ChangeAvatar from './components/change-avatar/change-avatar';
import Markup from '../../components/markup/markup';
import ProfileForm from './components/input/profileForm';
import Link from '../../components/link/link';
import ModalsContainer from '../../components/modal/modalsContainer';
import { equalObjectsShallow, getUser } from '../../scripts/globalFunctions';
import { userDTO } from '../../scripts/dto/dto';
import Input from '../profile/components/input/input';

const tmpl: string = `main(data-child="inputs").profile
  div(data-child="avatar")

  h2.profile__name \#{user.display_name ? user.display_name : user.first_name}

  div(data-child="return").return

  div(data-child="modals")`;

const avatar: string = `.profile__avatar
  img(src=user.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + user.avatar : '/user-placeholder.png' alt=user.display_name class="profile__img")
  .profile__avatar-change`;

export default class Profile extends Block {
  constructor(props: Props) {
    super({
      tagName: 'div'
    }, tmpl, {
      user: {},
      renderInputs: props.inputs
    }, {
      inputs: [new ProfileForm({
        tag: props.tag,
        id: props.id,
        setUser: props.setUser,
        setWarning: props.setWarning,
        submit: props.submit,
        children: {
          actions: props.actions
        }
      })],
      avatar: [new Markup({
        template: avatar,
        props: {
          user: {},
          events: {
            click: () => {
              const modal: HTMLElement = document.querySelector('.change-avatar')!;
              modal.classList.add('opened');
              modal.parentElement!.classList.add('opened');
            }
          }
        }
      })],
      return: [new Link({ text: '', classList: 'return__link', path: props.return })],
      modals: [new ModalsContainer({
        children: [
          new ChangeAvatar({
            setAvatar: (avatar: string) => this.setProps({ user: { ...this.props.user, avatar } })
          })
        ],
        notifications: props.notification ? [props.notification] : undefined
      })]
    });
  }

  async componentDidMount() {
    const user: userDTO = await getUser();
    if (equalObjectsShallow(user, this.props.user)) return;
    const inputs: Array<Record<string, any>> = this.props.renderInputs(user);
    this.children.inputs[0].setChildren('inputs', inputs.map((item: Record<string, any>) => new Input(item)));
    this.children.avatar[0].setProps({ user });
    this.setProps({ user });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps.user.avatar !== newProps.user.avatar) {
      this.children.avatar[0].setProps({ user: newProps.user });
    }
    return true;
  }
}