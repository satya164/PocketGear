import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  createComponentForStaticNavigation,
  createStaticNavigation,
  type NavigatorScreenParams,
  type StaticParamList,
  type StaticScreenProps,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import type { PokemonID } from '../types';
import PokemonChooser from './PokemonChooser';
import PokemonDetails from './PokemonDetails';
import PokemonInfo from './PokemonInfo';
import PokemonMatches from './PokemonMatches';
import PokemonTools from './PokemonTools';
import StrongAgainstList from './StrongAgainstList';
import WeakAgainstList from './WeakAgainstList';

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  tablabel: {
    color: '#222',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    marginVertical: 8,
  },

  indicator: {
    backgroundColor: '#222',
  },
});

const InfoTabs = createMaterialTopTabNavigator({
  screenOptions: {
    tabBarStyle: styles.tabbar,
    tabBarIndicatorStyle: styles.indicator,
    tabBarLabelStyle: styles.tablabel,
    tabBarActiveTintColor: '#222',
    tabBarInactiveTintColor: '#222',
  },
  screens: {
    Details: PokemonDetails,
    Matches: PokemonMatches,
    Tools: PokemonTools,
  },
});

const InfoTabsNavigator = createComponentForStaticNavigation(
  InfoTabs,
  'InfoTabs'
);

const InfoScreen = ({
  route,
  ...rest
}: StaticScreenProps<
  { pokemonId: PokemonID } & (
    | NavigatorScreenParams<StaticParamList<typeof InfoTabs>>
    // eslint-disable-next-line @typescript-eslint/ban-types
    | {}
  )
>) => {
  return (
    <PokemonInfo route={route}>
      <InfoTabsNavigator {...rest} />
    </PokemonInfo>
  );
};

InfoScreen.config = InfoTabs.config;

const HomeStack = createStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Main: PokemonChooser,
    StrongAgainst: StrongAgainstList,
    WeakAgainst: WeakAgainstList,
    Info: InfoScreen,
  },
});

const Navigation = createStaticNavigation(HomeStack);

export default Navigation;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends StaticParamList<typeof HomeStack> {}
  }
}
