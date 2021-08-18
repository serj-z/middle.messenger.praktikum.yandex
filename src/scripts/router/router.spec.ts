import { expect } from 'chai';
import ChatsPage from '../../pages/chats/chats';
import LoginPage from '../../pages/login/login';
import ProfilePage from '../../pages/profile/profile';
import SignupPage from '../../pages/signup/signup';
import { Paths } from '../dto/types';
import Router from './router';


const router = new Router('#root');

router
  .use(Paths.ROOT, ChatsPage)
  .use(Paths.LOGIN, LoginPage)
  .use(Paths.SIGNUP, SignupPage)
  .use(Paths.PROFILE, ProfilePage)
  .start();


describe('Роутер', () => {

  describe('Навигация', () => {

    it('Чаты', () => {
      router.go(Paths.ROOT)
      console.log(window.location.pathname);
      expect(window.location.pathname).to.eq(Paths.SIGNUP);
    });

    it('Регистрация', () => {
      router.go(Paths.SIGNUP);
      console.log(window.location.pathname);
      expect(window.location.pathname).to.eq(Paths.SIGNUP);
    });

    it('Вход', () => {
      router.go(Paths.LOGIN);
      console.log(window.location.pathname);
      expect(window.location.pathname).to.eq(Paths.LOGIN);
    });

    it('Профиль', () => {
      router.go(Paths.PROFILE);
      console.log(window.location.pathname);
      expect(window.location.pathname).to.eq(Paths.PROFILE);
    });

  });

});