import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/dto/types';
import Compose from '../compose/compose';
import { render as compile } from 'pug';
import { httpGet, httpPost } from '../../../../scripts/http/httpWrap';
import ChatInfo from './chat-info';
import { chatUsersBlock } from '../chat-users/chat-users-modal';
import { addUsersBlock } from '../add-user/add-users-modal';
import { messageDTO } from '../../../../scripts/dto/dto';
import Message from './message';
import { calcChatDate, getLocalTime } from '../../../../scripts/globalFunctions';

export default class Chat extends Block {

  chatInfo: Block;

  constructor(props: Props) {

    const chatInfo = new ChatInfo({
      chat: props.chat,
      events: {
        click: (e: Event) => {
          e.stopPropagation();
          const target: HTMLElement = e.target as HTMLElement;
          const elem: HTMLElement = document.querySelector(target.tagName === 'IMG' ? '.chat-image' : '.chat-users-modal')!;
          elem.classList.add('opened');
          elem.parentElement!.classList.add('opened');
        }
      }
    });

    super({
      tagName: 'div',
      classList: 'chat'
    }, '', props, {
      chatInfo: [chatInfo],
      deleteChat: [],
      compose: [new Compose()]
    });

    this.chatInfo = chatInfo;
  }

  ping(socket: WebSocket): void {
    const interval = setInterval(() => {
      socket.send(JSON.stringify({ type: 'ping' }));
    }, 30000);
    socket.onclose = () => clearInterval(interval);
  }

  async getChatToken(chatId: number): Promise<string> {
    const res = await httpPost(`/chats/token/${chatId}`, {
      data: undefined
    });
    return JSON.parse(res).token;
  }

  async connect(chatId: number) {
    const token = await this.getChatToken(chatId);
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.props.user.id}/${chatId}/${token}`);
    this.ping(socket);
    this.setProps({ socket });
    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));

      // socket.send(JSON.stringify({
      //   content: 'Моё второе сообщение миру!',
      //   type: 'message',
      // }));
    });

    socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', event => {
      console.log('Получены данные', event.data);
      const res = JSON.parse(event.data);
      if (!res.length) return;
      const messages: Array<messageDTO> = res;

      const messagesArray: Array<Props> = [];
      for (let i = 0; i < messages.length; i++) {
        const m: messageDTO = messages[i];
        const dateFormattedNext: string = calcChatDate(messages[i + 1]?.time);
        const dateFormatted: string = calcChatDate(m.time);

        messagesArray.push({
          message: messages[i],
          timeFormatted: getLocalTime(messages[i].time),
          user: this.props.user
        });
        if (dateFormattedNext !== dateFormatted) messagesArray.push({ dateFormatted });
      }

      this.setChildren('messages', messagesArray.map((message: Props) => new Message(message)));
      const dialog: HTMLElement = this.getContent().querySelector('.dialog')!;
      dialog.scrollTop = dialog.scrollHeight;
    });

    socket.addEventListener('error', event => {
      console.log('Ошибка', event);
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps.chat.id !== newProps.chat.id) {

      if (this.props.socket) {
        this.props.socket.close();
      }

      this.chatInfo.setProps({ chat: newProps.chat });
      addUsersBlock.setProps({ chatId: newProps.chat.id });

      if (newProps.chat.id) {
        this.connect(newProps.chat.id);
        httpGet(`/chats/${newProps.chat.id}/users`, {
          data: undefined,
        }).then((users: string) => {
          chatUsersBlock.setProps({ users: JSON.parse(users), chatId: newProps.chat.id });
        });
      } else {
        chatUsersBlock.setProps({ users: [], chatId: undefined });
      }

      return true;
    }
    return false;
  }

  render() {
    let template: string;
    if (this.props.chat.id) {

      template = `.chat__dialog(data-child="compose")
      .chat__contact(data-child="chatInfo deleteChat")
      
      .dialog
        .dialog__container(data-child="messages")`;

    } else {
      template = 'p.chat__placeholder Select a chat to send a message';
    }

    return compile(template);
  }
}