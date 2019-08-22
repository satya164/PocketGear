import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonChooser from './PokemonChooser';
import PokemonInfo from './PokemonInfo';
import StrongAgainstList from './StrongAgainstList';
import WeakAgainstList from './WeakAgainstList';

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={PokemonChooser} />
      <Stack.Screen name="StrongAgainst" component={StrongAgainstList} />
      <Stack.Screen name="WeakAgainst" component={WeakAgainstList} />
      <Stack.Screen name="Info" component={PokemonInfo} />
    </Stack.Navigator>
  );
}
