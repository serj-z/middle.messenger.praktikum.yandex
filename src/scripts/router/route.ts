import Block from '../block/block';
import { render } from '../globalFunctions';
import { Constructable, State } from '../dto/types';


export default class Route {

  private _pathname: string;
  private _blockClass: Constructable<Block>;
  private _block: Block;
  private _props: Record<string, string>;

  constructor(pathname: string, view: Constructable<Block>, props: Record<string, string>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.remove();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  setState(state: State): void {
    this._block.setProps({ state });
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
    }
    this._block.componentDidMount();
    render(this._props.rootQuery, this._block);
  }
}