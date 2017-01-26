/* @flow */

import { StackNavigator } from 'react-navigation';
import PokemonChooser from './PokemonChooser';
import PokemonInfo from './PokemonInfo';
import StrongAgainstList from './StrongAgainstList';
import WeakAgainstList from './WeakAgainstList';

const Home = StackNavigator({
  Main: { screen: PokemonChooser },
  StrongAgainst: { screen: StrongAgainstList },
  WeakAgainst: { screen: WeakAgainstList },
  Info: { screen: PokemonInfo },
}, {
  initialRouteName: 'Main',
  headerMode: 'none',
});

export default Home;
