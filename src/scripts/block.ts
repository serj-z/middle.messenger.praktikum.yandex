import EventBus from './eventBus';
import { BlockMeta, Props, Children, LifeCycles } from './types';
import { render as compile } from 'pug';

export default abstract class Block {

  private _element: HTMLElement = null;
  private _meta: BlockMeta = null;
  props: Props = {};
  eventBus: Function;

  constructor(tagName: string, template: string, props: Props = {}, children: Children = {}) {
    const eventBus: EventBus = new EventBus();
    this._meta = {
      tagName,
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
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
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

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true;
  }

  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string): void => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  get element(): HTMLElement {
    return this._element;
  }

  private _render(): void {
    this._element.textContent = '';
    this._element.append(this._toDocument());
    this._addEvents();
  }

  private _toDocument(): Node {
    const template: string = compile(this._meta.template, this.props);
    const parser: DOMParser = new DOMParser();
    const dom: HTMLElement = parser.parseFromString(template, 'text/html').body;
    const children: Children = this._meta.children;

    Object.keys(children).forEach(child => {
      const parent = dom.querySelector(`[data-child*=${child}]`);
      children[child].forEach((item: Block) => parent.append(item.getContent()));
    });

    return dom.firstChild;
  }

  getContent(): HTMLElement {
    return this.element;
  }

  private _makePropsProxy(props: object): Props {
    const self: Block = this;

    return new Proxy(props, {
      get(target: object, prop: string): any {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: object, prop: string, value: any): boolean {
        target[prop] = value;
        self.eventBus().emit(LifeCycles.FLOW_CDU, { ...target }, target);
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
