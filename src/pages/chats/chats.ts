import Block from '../../scripts/block';
import { chatUsersBlock } from '../../modules/chats/components/chat-users/chat-users-modal';
import DeleteChat from '../../modules/chats/components/delete-chat/deleteChat';
import Chats, { chat } from '../../modules/chats/chats';
import MenuItems from '../../modules/menu/menu';
import ModalsContainer from '../../components/modal/modalsContainer';
import Notification from '../../components/notification/notification';
import { chatDTO, userDTO } from '../../scripts/dto/dto';
import { getUser } from '../../scripts/globalFunctions';
import CreateChat from '../../modules/chats/components/create-chat/createChat';
import Contacts from '../../modules/chats/components/contact/contacts';
import { Props } from '../../scripts/dto/types';
import ChatAvatar from '../../modules/chats/components/chat-avatar/chat-avatar';
import ChatUsersModal from '../../modules/chats/components/chat-users/chat-users-modal';
import AddUsersModal from '../../modules/chats/components/add-user/add-users-modal';

const tmpl: string = `main.chats-wrap(data-child="chatsComponents")
div(data-child="modals")`;

const modalsContainer = new ModalsContainer({
  children: []
});

export default class ChatsPage extends Block {
  constructor() {
    const contacts = new Contacts({ chats: [], setChat: (chat: chatDTO) => this.setProps({ activeChat: chat }) });

    super({
      tagName: 'div'
    }, tmpl, {
      user: {},
      activeChat: {}
    }, {
      chatsComponents: [new MenuItems(), new Chats({
        contacts
      })],
      modals: [modalsContainer]
    });

    modalsContainer.setChildren('modals', [new CreateChat({
      contacts,
      modalsContainer
    }), new AddUsersModal(),
    new DeleteChat({
      contacts
    }), new ChatAvatar({
      contacts
    }), new ChatUsersModal({
      user: this.props.user
    })]);

    chatUsersBlock.setProps({ contacts });
  }

  async componentDidMount() {
    const user: userDTO = await getUser();
    this.setProps({ user });
    this.children.chatsComponents.forEach((component: Block) => component.setProps({ user }))
    chatUsersBlock.setProps({ user });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (this.props.state?.signedUp) {

      modalsContainer.setChildren('notifications', [new Notification({
        text: 'You have successfully signed up!',
        title: 'Success!',
        classList: 'opened',
        btnText: 'Ok',
      })]);
      modalsContainer.getContent().querySelector('.modal-bg')!.classList.add('opened');

      return true;
    }

    if (oldProps.activeChat.id !== newProps.activeChat.id) {
      chat.setProps({ chat: newProps.activeChat });
      return false;
    }
    return false;
  }

  componentWillUnmount() {
    this.resetProps();
  }
}