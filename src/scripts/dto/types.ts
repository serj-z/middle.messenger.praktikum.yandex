import Block from '../block/block';

export type ChatInfo = {
  id: string,
  name: string,
  unread: string,
  img: string,
  time: string,
  message: string
};

export type Message = {
  time: string,
  text?: string,
  image?: string,
  you?: boolean,
  read?: boolean
};

export type MessagesOnDate = {
  date: string,
  messages: Array<Message>
};

export type Messages = {
  [id: string]: Array<MessagesOnDate>;
};

export type User = {
  login: string;
  first_name: string,
  second_name: string,
  avatar?: string,
  display_name?: string,
  email: string,
  phone: string
};

export type BlockMeta = {
  tag: Tag,
  template: string,
  props: Props,
  children: Children
};

export type Props = {
  events?: BlockEvents;
  bindContext?: boolean;
  [prop: string]: any;
};

export type Tag = {
  tagName: string;
  text?: string;
  classList?: string;
  attrs?: {
    [attr: string]: string;
  }
};

export type BlockEvents = {
  [event: string]: EventListener
};

export type Children = {
  [child: string]: Array<Block>
};

export type Listener = Record<string, Array<Function>>;

export interface IEventBus {
  listeners: Listener;
  on: Function;
  off: Function;
  emit: Function
};

export type RequestOptions = {
  headers?: Record<string, string>,
  method: Methods,
  timeout?: number,
  data: any
};

export type HTTPOptions = {
  headers?: Record<string, string>,
  timeout?: number,
  data: any
};

export enum LifeCycles {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
  FLOW_CWU = 'flow:component-will-unmount'
};

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
};

export type ValidationRule = (val: string) => boolean;
export type Validator = (val: string) => string;
export type MakeValidator = (msg?: string, arg?: any) => Validator;

export enum PassTypes {
  pass,
  oldPass,
  confirmPass
};

export interface Constructable<T> {
  new(...args: any): T;
};

export enum Paths {
  ROOT = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  EDIT_PROFILE = '/edit-profile',
  CHANGE_PASS = '/change-pass',
  PROFILE = '/profile',
  NOT_FOUND = '/404',
  SERVER_ERROR = '/500'
};

export type State = Record<string, any> | null;

export type UserPass = Partial<User> & {
  password: string
};