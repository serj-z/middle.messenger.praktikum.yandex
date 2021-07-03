import EventBus from './eventBus';
import { BlockMeta, Props, Children, LifeCycles, Tag } from './types';
import { render as compile } from 'pug';

export default abstract class Block {

  private _element: HTMLElement;
  private _meta: BlockMeta;
  props: Props;
  eventBus: Function;

  constructor(tag: Tag = { tagName: 'div' }, template: string, props: Props = {}, children: Children = {}) {
    const eventBus: EventBus = new EventBus();
    this._meta = {
      tag,
      template,
      props,
      children
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(LifeCycles.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(LifeCycles.INIT, this.init.bind(this));
    eventBus.on(LifeCycles.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(LifeCycles.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(LifeCycles.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tag } = this._meta;
    this._element = this._createDocumentElement(tag.tagName);
    if (tag.classList) this._element.className = tag.classList;
    if (tag.attrs) {
      Object.keys(tag.attrs).forEach((attr: string) => {
        if(tag.attrs) this._element.setAttribute(attr, tag.attrs[attr]);
      });
    }
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(LifeCycles.FLOW_CDM);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(LifeCycles.FLOW_RENDER);
  }

  componentDidMount(): void { }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response: boolean = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    return true;
  }

  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setChildren = (elem: string, newChildren: Array<Block>): void => {
    this._meta.children[elem] = newChildren;
    this._render();
  };

  private _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string): void => {
      let fn: EventListener = events[eventName];
      if(this.props.bindContext) fn = fn.bind(this);
      this._element.addEventListener(eventName, fn);
    });
  }

  get element(): HTMLElement {
    return this._element;
  }

  get children(): Children {
    return this._meta.children;
  }

  private _render(): void {
    this._element.textContent = this._meta.tag.text ? this._meta.tag.text : '';
    [...this._toDocument().childNodes].forEach((node: Node): void => {
      this._element.append(node);
    });
    this._addEvents();
  }

  render(): string {
    return '';
  }

  private _toDocument(): Node {
    const template: string = this._meta.template ? compile(this._meta.template, this.props) : this.render();
    const parser: DOMParser = new DOMParser();
    const dom: HTMLElement = parser.parseFromString(template, 'text/html').body;
    const children: Children = this._meta.children;

    Object.keys(children).forEach(child => {
      const parent = dom.querySelector(`[data-child*=${child}]`);
      if (parent) children[child].forEach((item: Block) => parent.append(item.getContent()));
    });

    return dom;
  }

  getContent(): HTMLElement {
    return this.element;
  }

  private _makePropsProxy(props: object): Props {
    const self: Block = this;

    return new Proxy(props, {
      get(target: Record<string, any>, prop: string): any {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, any>, prop: string, value: any): boolean {
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(LifeCycles.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
