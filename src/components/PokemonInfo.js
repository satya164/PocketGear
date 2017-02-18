/* @flow */

import find from 'lodash/find';
import memoize from 'lodash/memoize';
import React, { PropTypes, PureComponent } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  View,
} from 'react-native';
import {
  TabNavigator,
} from 'react-navigation';
import Appbar from './Appbar';
import DelayedItem from './DelayedItem';
import PokemonTypeLabel from './PokemonTypeLabel';
import PokemonDetails from './PokemonDetails';
import PokemonMatches from './PokemonMatches';
import PokemonTools from './PokemonTools';
import store from '../store';
import type {
  PokemonID,
  Pokemon,
} from '../types';

const LOLLIPOP = 21;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  appbar: {
    elevation: 0,
    borderBottomWidth: 0,
    shadowOpacity: 0,
  },

  image: {
    marginHorizontal: 8,
    height: 72,
    resizeMode: 'contain',
  },

  label: {
    color: '#222',
    fontFamily: 'Montserrat',
    width: 160,
  },

  name: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    marginVertical: 4,
  },

  types: {
    flexDirection: 'row',
    marginHorizontal: -2,
  },

  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },

  meta: {
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  basic: {
    flex: 1,
  },

  tabbar: {
    backgroundColor: '#fff',
    elevation: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    borderBottomWidth: Platform.OS === 'android' && Platform.Version < LOLLIPOP ? StyleSheet.hairlineWidth : 0,
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

type Props = {
  navigation: Object;
  style?: any;
}

/* $FlowFixMe */
console.ignoredYellowBox = [ 'Behaviour of screenProps has changed' ];

const InfoTabs = TabNavigator({
  Details: {
    screen: ({ screenProps, ...rest }) => (
      <PokemonDetails {...rest} {...screenProps} />
    ),
  },
  Matches: {
    screen: ({ screenProps, ...rest }) => (
      <DelayedItem
        {...rest}
        {...screenProps}
        component={PokemonMatches}
      />
    ),
  },
  Tools: {
    screen: ({ screenProps, ...rest }) => (
      <DelayedItem
        {...rest}
        {...screenProps}
        component={PokemonTools}
      />
    ),
  },
}, {
  ...TabNavigator.Presets.AndroidTopTabs,
  tabBarOptions: {
    style: styles.tabbar,
    indicatorStyle: styles.indicator,
    labelStyle: styles.tablabel,
    activeTintColor: '#222',
    inactiveTintColor: '#222',
  },
  backBehavior: 'none',
  initialRouteName: 'Details',
  order: [ 'Details', 'Matches', 'Tools' ],
});

class PokemonInfo extends PureComponent<void, Props, void> {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    style: ScrollView.propTypes.style,
  };

  static router = InfoTabs.router;

  _getPokemon: (id: PokemonID) => Pokemon = memoize((id: PokemonID) => {
    const pokemons = store.getPokemons();
    const pokemon = find(pokemons, { id });
    return pokemon;
  });

  render() {
    const pokemon = this._getPokemon(this.props.navigation.state.params.pokemonId);
    const sprite = store.getSprite(this.props.navigation.state.params.pokemonId);

    return (
      <View {...this.props} style={[ styles.container, this.props.style ]}>
        <Appbar style={styles.appbar} navigation={this.props.navigation}>
          {'#' + pokemon.id}
        </Appbar>
        <View style={[ styles.row, styles.meta ]}>
          <View style={styles.basic}>
            <Text style={[ styles.label, styles.name ]}>{pokemon.name}</Text>
            <View style={styles.types}>
              {pokemon.types.map(type =>
                <PokemonTypeLabel key={type} type={type} />
              )}
            </View>
          </View>
          <Image style={styles.image} source={sprite} />
        </View>
        <InfoTabs
          screenProps={{ pokemon }}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default PokemonInfo;
