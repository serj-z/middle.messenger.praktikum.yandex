import Block from '../../../../scripts/block/block';
import { Props } from '../../../../scripts/dto/types';
import Compose from '../compose/compose';
import { render as compile } from 'pug';
import { httpGet, httpPost } from '../../../../scripts/http/httpWrap';
import ChatInfo from './chat-info';
import { chatUsersBlock } from '../chat-users/chat-users-modal';
import { addUsersBlock } from '../add-user/add-users-modal';
import { fileDTO, messageDTO, userDTO } from '../../../../scripts/dto/dto';
import Message from './message';
import { calcChatDate, getLocalTime } from '../../../../scripts/globalFunctions';
import ChatService from './chat-service';

export default class Chat extends Block {

  chatInfo: Block;
  page: number;
  perPage: number;
  lastResponseChatId: number;
  loadPage: EventListener;
  lastDate: string;
  lastSender: string;

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
      compose: [new Compose()],
      messages: []
    });

    this.chatInfo = chatInfo;
    this.perPage = 20;
    this.page = 0;

    this.loadPage = (): void => {
      const dialog: HTMLElement = this.getContent().querySelector('.dialog')!;
      const dialogContainer: HTMLElement = this.getContent().querySelector('.dialog__container')!;
      const scrollTopLoadPoint = dialog.getBoundingClientRect().top - 100;
      const dialogScrolled = dialogContainer.getBoundingClientRect().top;
      if (scrollTopLoadPoint < dialogScrolled) {
        this.props.socket.send(JSON.stringify({
          content: (this.perPage * this.page).toString(),
          type: 'get old',
        }));
        this.page++;
      }
    }
  }

  scrollBottom() {
    const dialog: HTMLElement = this.getContent().querySelector('.dialog')!;
    dialog.scrollTop = dialog.scrollHeight;
  }

  initChat(messages: Array<messageDTO>): void {
    const messagesArray: Array<Props> = [];
    for (let i = 0; i < messages.length; i++) {
      const m: messageDTO = messages[i];
      const nextMessage: messageDTO | undefined = messages[i + 1];
      const dateFormattedNext = calcChatDate(nextMessage?.time);
      const dateFormatted = calcChatDate(m.time);

      const senderNext = nextMessage?.user_id;
      const sender = m.user_id;

      messagesArray.push({
        message: m,
        timeFormatted: getLocalTime(m.time),
        user: this.props.user,
        sender: sender === senderNext ? undefined : this.props.users.find((u: userDTO) => u.id === +m.user_id)
      });
      if (dateFormattedNext !== dateFormatted) {
        messagesArray.push({ dateFormatted })
      };
    }
    const lastMessage: messageDTO = messages[messages.length - 1];
    this.lastDate = calcChatDate(lastMessage.time);
    this.lastSender = lastMessage.user_id;

    this.setChildren('messages', messagesArray.map((message: Props) => new Message(message)), () => {
      this.scrollBottom();
      const dialog: HTMLElement = this.getContent().querySelector('.dialog')!;
      dialog.addEventListener('scroll', this.loadPage);
    });
  }

  async getChatToken(chatId: number): Promise<string> {
    const res = await httpPost(`/chats/token/${chatId}`, {
      data: undefined
    });
    return JSON.parse(res).token;
  }

  async connect(chatId: number) {
    const pingInterval: number = 30000;
    const chatService = new ChatService(chatId, this.props.user.id);
    const socket = await chatService.connect(pingInterval);
    this.setProps({ socket });
    this.page = 0;
    this.setChildren('messages', []);
    this.children.compose[0].setProps({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const formMessage: HTMLFormElement = this.element.querySelector('#formMessage')!;
          const content: string = formMessage.sendMessage.value.trim();
          if (!content) return;
          socket.send(JSON.stringify({
            content,
            type: 'message',
          }));
          formMessage.sendMessage.value = '';
        },
        change: async (e: Event) => {
          e.preventDefault();
          const target: HTMLInputElement = e.target as HTMLInputElement;

          if (!target.files?.length) return;
          try {
            const data = new FormData();
            data.append('resource', target.files[0]);
            const res = await httpPost('/resources', { data });
            const file: fileDTO = JSON.parse(res);

            socket.send(JSON.stringify({
              content: `${file.id}`,
              type: 'file',
            }));

          } catch (err) {
            console.log('Error', err);
          }

        }
      }
    });
    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      socket.send(JSON.stringify({
        content: this.page.toString(),
        type: 'get old',
      }));
      this.page++;
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

      if ((res.type !== 'message' && res.type !== 'file') && !res.length) {
        const dialog: HTMLElement | null = this.getContent().querySelector('.dialog');
        if (dialog) dialog.removeEventListener('scroll', this.loadPage);
        return;
      }

      if (res.length) {

        if (this.lastResponseChatId !== chatId) {
          this.lastResponseChatId = chatId;
          this.initChat(res);
          return;
        }

        const messages: Array<messageDTO> = res;
        const fragment: DocumentFragment = document.createDocumentFragment();
        for (let i = 0; i < messages.length; i++) {
          const message: messageDTO = messages[i];
          const nextMessage: messageDTO | undefined = messages[i + 1];
          const dateFormattedNext = calcChatDate(nextMessage?.time);
          const dateFormatted = calcChatDate(message.time);

          const senderNext = nextMessage?.user_id;
          const sender = message.user_id;

          let elem: Message = new Message({
            message,
            timeFormatted: getLocalTime(message.time),
            user: this.props.user,
            sender: sender === senderNext ? undefined : this.props.users.find((u: userDTO) => u.id === +message.user_id)
          });
          this.appendChild('messages', elem);
          fragment.append(elem.getContent());

          if (dateFormattedNext !== dateFormatted) {
            elem = new Message({ dateFormatted })
            this.appendChild('messages', elem);
            fragment.append(elem.getContent());
            this.lastDate = dateFormatted;
          }
        }
        const d: HTMLElement = this.getContent().querySelector('.chat-date:last-child')!;
        if (d && this.lastDate !== d.innerText) d.remove();
        this.getContent().querySelector('.dialog__container')!.append(fragment);
        this.lastSender = messages[messages.length - 1].user_id;
      } else {
        const message: messageDTO = res;
        const time: string = getLocalTime(message.time);
        this.prependChild('messages', new Message({
          message: message,
          timeFormatted: time,
          user: this.props.user,
          sender: this.lastSender === message.user_id ? undefined : this.props.users.find((u: userDTO) => u.id === +message.user_id)
        }), true);
        this.scrollBottom();
        this.props.contact.setProps({
          lastSender: this.props.users.find((item: userDTO) => item.id === +message.user_id),
          last_message: message,
          time
        })
        this.lastSender = message.user_id;
      }
      this.lastResponseChatId = chatId;
    });

    socket.addEventListener('error', event => {
      console.log('Ошибка', event);
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps.chat.id !== newProps.chat.id) {

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

  componentWillUnmount() {
    if (this.props.socket) {
      this.props.socket.close();
    }
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
