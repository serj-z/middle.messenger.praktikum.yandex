import Block from './block';

export type BlockMeta = {
  tag: Tag,
  template: string,
  props: Props,
  children: Children
};

export type Props = {
  events?: BlockEvents;
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

export enum LifeCycles {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
};