import Block from '../../scripts/block';
import tmpl from './template.pug';
import { Props } from '../../scripts/types';
import user from '../../data/user.json';
import Return from './components/return/return';
import ChangeAvatar from './components/change-avatar/change-avatar';
import Markup from '../../components/markup/markup';
import avatar from '../profile/components/avatar/template.pug';
import ProfileForm from './components/input/profileForm';

export default class Profile extends Block {
  constructor(props: Props) {
    super({
      tagName: 'div'
    }, tmpl, { ...user }, {
      inputs: [new ProfileForm({
        tag: 'div',
        children: {
          content: props.inputs
        }
      })],
      avatar: [new Markup({
        template: avatar,
        props: {
          img: user.img,
          displayname: user.displayname,
          events: {
            click: () => {
              const modal: HTMLElement = document.querySelector('.change-avatar');
              modal.classList.add('opened');
              modal.parentElement.classList.add('opened');
            }
          }
        }
      })],
      return: [new Return({ link: props.return })],
      modals: [new ChangeAvatar()]
    });
  }
}