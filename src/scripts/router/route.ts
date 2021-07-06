import Block from "../block";
import { render } from "../globalFunctions";
import { Constructable } from "../types";


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

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }
    render(this._props.rootQuery, this._block);
  }
}