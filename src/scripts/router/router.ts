import Route from './route';
import Block from '../block/block';
import { Constructable, Paths, State } from '../dto/types';
import { checkAuth } from '../globalFunctions';

export default class Router {

  routes: Array<Route>;
  history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;
  private static __instance: Router;
  private _loggedIn: boolean;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._loggedIn = false;

    Router.__instance = this;
  }

  use(pathname: string, block: Constructable<Block>): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  async start(): Promise<void> {

    window.onpopstate = (event: PopStateEvent) => {
      const w = event.currentTarget as Window;
      if (!this._loggedIn && (w.location.pathname !== Paths.LOGIN && w.location.pathname !== Paths.SIGNUP)) return;
      this._onRoute(w.location.pathname, event.state);
    };

    const isLoginPage = window.location.pathname === Paths.LOGIN || window.location.pathname === Paths.SIGNUP;
    if (!isLoginPage) await checkAuth();
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string, state: State = null) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go(Paths.NOT_FOUND);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
    if (state) route.setState(state);
  }

  go(pathname: string, state: State = null): void {
    const triggerPopState: PopStateEvent = new PopStateEvent('popstate', { state });
    this.history.pushState(state, '', pathname);
    dispatchEvent(triggerPopState);
  }

  setLoggedIn(isLoggedIn: boolean): void {
    this._loggedIn = isLoggedIn;
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }
}