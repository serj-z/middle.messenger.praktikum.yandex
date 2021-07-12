import Block from '../../scripts/block';
import AddContact from '../../modules/chats/components/add-contact/add-contact';
import DeleteChat from '../../modules/chats/components/delete-chat/deleteChat';
import Chats from '../../modules/chats/chats';
import MenuItems from '../../modules/menu/menu';
import ModalsContainer from '../../components/modal/modalsContainer';
import Notification from '../../components/notification/notification';

const tmpl: string = `main.chats-wrap(data-child="chatsComponents")
div(data-child="modals")`;

const modalsContainer = new ModalsContainer({
  children: [new AddContact(), new DeleteChat()]
});

export default class ChatsPage extends Block {
  constructor() {
    super({
      tagName: 'div'
    }, tmpl, undefined, {
      chatsComponents: [new MenuItems(), new Chats()],
      modals: [modalsContainer]
    });
  }

  componentDidUpdate() {
    if (this.props.state?.signedUp) {

      modalsContainer.setChildren('modals', [...modalsContainer.children.modals, new Notification({
        text: 'You have successfully signed up!',
        title: 'Success!',
        classList: 'opened',
        btnText: 'Ok',
      })]);
      modalsContainer.getContent().querySelector('.modal-bg')!.classList.add('opened');

      return true;
    }
    return false;
  }
}