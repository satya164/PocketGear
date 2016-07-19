/* @flow */

export type Route = {
  name: string;
  props?: Object;
}

export type NavigationState = {
  routes: Array<Route>;
  index: number;
}

export type NavigationAction = {
  type: 'push' | 'pop';
  route?: Route;
}
