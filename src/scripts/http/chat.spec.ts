import { expect, assert } from 'chai';
import { chatDTO, messageDTO, userDTO } from '../dto/dto';
import { UserPass } from '../dto/types';
import { httpDelete, httpGet, httpPost, httpPut } from './httpWrap';
import { v4 as makeUUID } from 'uuid';
import { signup } from '../globalFunctions';


describe('Чат', () => {

  let userId1: number;
  let userId2: number;
  let users: Array<userDTO>;
  let chatTitle: string;
  let chat: chatDTO;

  describe('Регистрация пользователей', () => {

    it('Пользователь 1', async () => {
      const uuid = makeUUID();
      const userData: UserPass = {
        first_name: uuid,
        second_name: uuid,
        login: uuid,
        email: `${uuid}@mail.com`,
        phone: `8900${Math.floor(Math.random() * 90000) + 10000}`,
        password: uuid
      };
      const resObj: Record<string, number> = await signup(userData);
      assert.hasAllKeys(resObj, ['id']);
      userId1 = resObj.id;
    });

    it('Выход из учётки Пользователя 1', async () => {
      const res = await httpPost('/auth/logout', {
        data: undefined,
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      expect(res).equal('OK');
    });

    it('Пользователь 2', async () => {
      const uuid = makeUUID();
      const userData: UserPass = {
        first_name: uuid,
        second_name: uuid,
        login: uuid,
        email: `${uuid}@mail.com`,
        phone: `8900${Math.floor(Math.random() * 90000) + 10000}`,
        password: uuid
      };
      const resObj: Record<string, number> = await signup(userData);
      assert.hasAllKeys(resObj, ['id']);
      userId2 = resObj.id;
    });
  });


  describe('Создание чата', () => {

    it('Новый чат', async () => {
      chatTitle = makeUUID();
      const res = await httpPost('/chats', {
        data: {
          title: chatTitle
        },
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });

      const resObj: Record<string, any> = JSON.parse(res);
      assert.hasAllKeys(resObj, ['id']);
    });

    it('Поиск чата', async () => {
      const res: string = await httpGet('/chats', {
        data: {
          title: chatTitle
        },
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      chat = JSON.parse(res)[0];
      expect(chat.title).equal(chatTitle);
    });

    it('Добавление пользователя в чат', async () => {
      const res: string = await httpPut('/chats/users', {
        data: {
          users: [userId1],
          chatId: chat.id
        },
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      expect(res).equal('OK');
    });

    it('Получение пользователей чата', async () => {
      const res: string = await httpGet(`/chats/${chat.id}/users`, { data: undefined, });
      users = JSON.parse(res);
      assert.isAbove(users.findIndex((user: userDTO) => user.id === userId1), -1);
      assert.isAbove(users.findIndex((user: userDTO) => user.id === userId2), -1);
    });
  });


  describe('Отправка сообщений', () => {

    let chatToken: string;
    let socket: WebSocket;

    before(() => {
      socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId2}/${chat.id}/${chatToken}`);
    });

    it('Получение токена чата', async () => {
      const res = await httpPost(`/chats/token/${chat.id}`, { data: undefined });
      chatToken = JSON.parse(res).token;
      assert.notTypeOf(chatToken, 'undefined');
      assert.isString(chatToken);
    });

    it('Подключение к чату и отправка сообщения', () => {
      const testMessage: string = 'Тестовое сообщение';

      socket.addEventListener('open', () => {
        socket.send(JSON.stringify({
          content: testMessage,
          type: 'message',
        }));
      });

      socket.addEventListener('message', event => {
        const res = JSON.parse(event.data);
        if (res.type !== 'message' && !res.length) return;
        const message: messageDTO = res.length ? res[0] : res;
        expect(message.content).equal(testMessage);
      });

    });

  });


  describe('Модерация чата', () => {

    it('Удаление пользователя', async () => {
      const res: string = await httpDelete('/chats/users', {
        data: {
          users: [userId1],
          chatId: chat.id
        },
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      expect(res).equal('OK');
    });

    it('Удаление чата', async () => {
      await httpDelete('/chats', {
        data: {
          chatId: chat.id
        },
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      const res: string = await httpGet('/chats', {
        data: {
          title: chatTitle
        },
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      assert.isEmpty(JSON.parse(res));

      const logout = await httpPost('/auth/logout', {
        data: undefined,
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      expect(logout).equal('OK');

    });
  });

});