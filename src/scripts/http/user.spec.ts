import { expect, assert } from "chai";
import { userDTO } from "../dto/dto";
import { UserPass } from "../dto/types";
import { httpPost, httpPut } from "./httpWrap";
import { v4 as makeUUID } from "uuid";
import { getUser, signup } from "../globalFunctions";


describe('Пользователь', () => {

  const uuid = makeUUID();
  const userData: UserPass = {
    first_name: 'Тест',
    second_name: 'Тестович',
    login: uuid,
    email: `${uuid}@mail.com`,
    phone: '8(900)555-55-55',
    password: uuid
  };

  describe('Регистрация', () => {

    it('Регистрация нового пользователя и вход', async () => {
      const resObj: Record<string, number> = await signup(userData);
      assert.hasAllKeys(resObj, ['id']);
    });

    it('Получение данных пользователя', async () => {
      const user: userDTO = await getUser();
      assert.hasAllKeys(user, ['id', 'login', 'first_name', 'second_name', 'email', 'phone', 'display_name', 'avatar']);
    });

    it('Выход после регистрации', async () => {
      const res = await httpPost('/auth/logout', {
        data: undefined,
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      expect(res).equal('OK');
    });
  });

  describe('Редактирование профиля', () => {

    const newUuid = makeUUID();

    it('Вход существующего пользователя', async () => {
      const res: string = await httpPost('/auth/signin', {
        data: userData,
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      expect(res).equal('OK');
    });

    it('Изменение данных профиля', async () => {

      const first_name: string = `Тест${newUuid}`;
      const second_name: string = `Тестович${newUuid}`;
      const login: string = newUuid;
      const display_name: string = `Тест${newUuid}Тестович`;
      const email: string = `${newUuid}@mail.com`;
      const phone: string = '8(900)555-55-44';

      const res: string = await httpPut('/user/profile', {
        data: {
          first_name,
          second_name,
          login,
          display_name,
          email,
          phone
        },
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      const user: userDTO = JSON.parse(res);
      assert.strictEqual(user.display_name, display_name);
      assert.strictEqual(user.first_name, first_name);
      assert.strictEqual(user.email, email);
      assert.strictEqual(user.login, login);
      assert.strictEqual(user.second_name, second_name);
      assert.strictEqual(user.phone, phone);
    });

    it('Выход', async () => {
      const res = await httpPost('/auth/logout', {
        data: undefined,
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      });
      expect(res).equal('OK');
    });

  });
});