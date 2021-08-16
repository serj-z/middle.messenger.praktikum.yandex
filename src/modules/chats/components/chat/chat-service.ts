import { httpPost } from '../../../../scripts/http/httpWrap';

export default class ChatService {

  private _token: string;
  private _chatId: number;
  private _userId: number;
  socket: WebSocket;

  constructor(chatId: number, userId: number) {
    this._chatId = chatId;
    this._userId = userId;
  }

  connect = async (ping: number): Promise<WebSocket> => {
    this._token = await this.getChatToken(this._chatId);
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this._userId}/${this._chatId}/${this._token}`);
    this.ping(ping);
    return this.socket;
  }

  private getChatToken = async (chatId: number): Promise<string> => {
    const res = await httpPost(`/chats/token/${chatId}`, {
      data: undefined
    });
    return JSON.parse(res).token;
  }

  private ping = (interval: number): void => {
    const initInterval = setInterval(() => {
      this.socket.send(JSON.stringify({ type: 'ping' }));
    }, interval);
    this.socket.onclose = () => clearInterval(initInterval);
  }
}