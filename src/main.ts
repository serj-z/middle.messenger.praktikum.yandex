import './main.scss';
import Router from './scripts/router/router';
import ChatsPage from './pages/chats/chats';
import LoginPage from './pages/login/login';
import SignupPage from './pages/signup/signup';
import EditProfilePage from './pages/edit-profile/edit-profile';
import ChangePassPage from './pages/change-pass/change-pass';
import ProfilePage from './pages/profile/profile';
import Page404 from './pages/404/404';
import Page500 from './pages/500/500';
import { Paths } from './scripts/dto/types';

export const router = new Router('#root');

router
  .use(Paths.ROOT, ChatsPage)
  .use(Paths.LOGIN, LoginPage)
  .use(Paths.SIGNUP, SignupPage)
  .use(Paths.EDIT_PROFILE, EditProfilePage)
  .use(Paths.CHANGE_PASS, ChangePassPage)
  .use(Paths.PROFILE, ProfilePage)
  .use(Paths.NOT_FOUND, Page404)
  .use(Paths.SERVER_ERROR, Page500)
  .start();