/* @flow */

import PokemonChooser from '../PokemonChooser';
import PokemonInfo from '../PokemonInfo';
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
  default:
    return {
      component: PokemonChooser,
    };
  }
}
