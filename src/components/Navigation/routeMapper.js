/* @flow */

import PokemonChooser from '../PokemonChooser';
import PokemonDetails from '../PokemonDetails';
import type { Route } from './NavigationTypeDefinitions';

export type RouteDescription = {
  component: ReactClass<any>;
  type?: 'modal';
}

export default function(route: Route): RouteDescription {
  switch (route.name) {
  case 'details':
    return {
      component: PokemonDetails,
    };
  default:
    return {
      component: PokemonChooser,
    };
  }
}
