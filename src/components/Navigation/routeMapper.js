/* @flow */

import PokemonChooser from '../PokemonChooser';
import PokemonInfo from '../PokemonInfo';
import StrongAgainstList from '../StrongAgainstList';
import WeakAgainstList from '../WeakAgainstList';
import type { Route } from './NavigationTypeDefinitions';

export type RouteDescription = {
  component: ReactClass<any>;
  type?: 'modal';
}

export default function(route: Route): RouteDescription {
  switch (route.name) {
  case 'info':
    return {
      component: PokemonInfo,
    };
  case 'strong-against':
    return {
      component: StrongAgainstList,
    };
  case 'weak-against':
    return {
      component: WeakAgainstList,
    };
  default:
    return {
      component: PokemonChooser,
    };
  }
}
