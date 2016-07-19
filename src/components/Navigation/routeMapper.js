/* @flow */

import PokemonChooser from '../PokemonChooser';
import type { Route } from './NavigationTypeDefinitions';

export type RouteDescription = {
  component: ReactClass<any>;
  type?: 'modal';
}

export default function(route: Route): RouteDescription {
  switch (route.name) {
  default:
    return {
      component: PokemonChooser,
    };
  }
}
