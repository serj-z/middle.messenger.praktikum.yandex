import Block from '../../../../scripts/block/block';
import { chatDTO, chatsDTO } from '../../../../scripts/dto/dto';
import { Props } from '../../../../scripts/dto/types';
import { httpGet } from '../../../../scripts/http/httpWrap';
import Contact from './contact';

export default class Contacts extends Block {
  constructor(props: Props) {
    super({
      tagName: 'li'
    }, 'ul(data-child="contact")', {
      chats: props.chats || [],
      setChat: props.setChat,
      user: {},
      search: ''
    }, {
      contact: []
    });
  }

  async getChats(title: string): Promise<chatsDTO> {
    const res: string = await httpGet('/chats', {
      data: {
        title
      },
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      }
    });
    return JSON.parse(res);
  }

  componentDidUpdate(_oldProps: Props, newProps: Props) {
    this.getChats(newProps.search).then((chats) => {
      this.setChildren('contact', chats.map((chat: chatDTO) => new Contact({
        ...chat,
        user: this.props.user,
        setChat: () => this.props.setChat(chat)
      })));
    });
    return true;
  }
}