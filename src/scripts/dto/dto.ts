import { User } from './types';

export type userDTO = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string | null,
  login: string,
  avatar: string | null,
  email: string,
  phone: string,
  role?: string
};

export type chatDTO = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: User,
    time: string,
    content: string
  }
};

export type chatsDTO = Array<chatDTO>;

export type messageDTO = {
  chat_id: number,
  time: string,
  type: string,
  user_id: string,
  content: string,
  file?: {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  }
};

export type fileDTO = {
  id: number,
  user_id: number,
  path: string,
  filename: string,
  content_type: string,
  content_size: number,
  upload_date: string
};