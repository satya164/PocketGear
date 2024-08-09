import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  createComponentForStaticNavigation,
  createStaticNavigation,
  useRoute,
  type NavigatorScreenParams,
  type RouteProp,
  type StaticParamList,
  type StaticScreenProps,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from '../store';
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

  heading: {
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Montserrat',
    color: '#222',
    fontSize: 15,
  },

  subtitle: {
    fontFamily: 'Montserrat',
    color: '#000',
    opacity: 0.5,
    fontSize: 11,
  },
});

const MatchTitle = ({ children }: { children: React.ReactNode }) => {
  const route =
    useRoute<RouteProp<RootStackParamList, 'StrongAgainst' | 'WeakAgainst'>>();

  const pokemon = store.getPokemon(route.params.pokemonId);

  return (
    <View style={styles.heading}>
      <Text style={styles.title}>{pokemon?.name}</Text>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
};

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

const RootStack = createStackNavigator({
  screenOptions: {
    headerBackButtonDisplayMode: 'minimal',
    cardStyle: { flex: 1 },
  },
  screens: {
    Main: {
      screen: PokemonChooser,
      options: {
        title: 'PocketGear',
        headerShown: false,
      },
    },
    Info: {
      screen: InfoScreen,
      options: ({ route }) => {
        return {
          // @ts-expect-error: figure out how to type route
          title: '#' + route.params.pokemonId,
        };
      },
      linking: {
        path: ':pokemonId',
        parse: { pokemonId: Number },
      },
    },
  },
  groups: {
    Matches: {
      screenOptions: {
        title: 'Strong against',
        headerTitle: ({ children }) => <MatchTitle>{children}</MatchTitle>,
      },
      screens: {
        StrongAgainst: {
          screen: StrongAgainstList,
          options: {
            title: 'Strong against',
          },
          linking: {
            path: ':pokemonId/strong-against',
            parse: { pokemonId: Number },
          },
        },
        WeakAgainst: {
          screen: WeakAgainstList,
          options: {
            title: 'Weak against',
          },
          linking: {
            path: ':pokemonId/weak-against',
            parse: { pokemonId: Number },
          },
        },
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
