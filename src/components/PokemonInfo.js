/* @flow */

import find from 'lodash/find';
import memoize from 'lodash/memoize';
import React, { PropTypes, Component } from 'react';
import {
  Image,
  InteractionManager,
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  View,
} from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import Appbar from './Appbar';
import PokemonTypeLabel from './PokemonTypeLabel';
import Placeholder from './Placeholder';
import PokemonDetails from './PokemonDetails';
import PokemonMatches from './PokemonMatches';
import PokemonTools from './PokemonTools';
import store from '../store';
import type {
  PokemonID,
  Pokemon,
} from '../typeDefinitions';

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
    fontFamily: 'MontserratBold',
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

  tabview: {
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
    fontFamily: 'MontserratBold',
    fontSize: 10,
    marginVertical: 8,
  },

  indicator: {
    backgroundColor: '#222',
  },
});

type Route = {
  key: string;
  title?: string;
}

type Props = {
  onNavigate: Function;
  pokemonId: PokemonID;
  style?: any;
}

type State = {
  index: number;
  routes: Array<Route>;
  loading: boolean;
}

export default class PokemonInfo extends Component<void, Props, State> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemonId: PropTypes.number.isRequired,
    style: ScrollView.propTypes.style,
  };

  state: State = {
    index: 0,
    routes: [
      { key: 'details', title: 'Details' },
      { key: 'matches', title: 'Matches' },
      { key: 'tools', title: 'Tools' },
    ],
    loading: true,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(this._setLoading);
  }

  _setLoading = () => {
    this.setState({
      loading: false,
    });
  };

  _getPokemon: (id: PokemonID) => Pokemon = memoize((id: PokemonID) => {
    const pokemons = store.getPokemons();
    const pokemon = find(pokemons, { id });
    return pokemon;
  });

  _handleChangeTab = (index: number) => {
    this.setState({
      index,
    });
  };

  _renderLabel = ({ route }: { route: Route }) => {
    return <Text style={styles.tablabel}>{route.title && route.title.toUpperCase()}</Text>;
  }

  _renderHeader = (props: any) => {
    return (
      <TabBarTop
        {...props}
        renderLabel={this._renderLabel}
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
      />
    );
  };

  _renderScene = ({ route }: { route: Route }) => {
    if (this.state.loading) {
      return <Placeholder />;
    }

    const pokemon = this._getPokemon(this.props.pokemonId);
    switch (route.key) {
    case 'details':
      return <PokemonDetails pokemon={pokemon} onNavigate={this.props.onNavigate} />;
    case 'matches':
      return <PokemonMatches pokemon={pokemon} onNavigate={this.props.onNavigate} />;
    case 'tools':
      return <PokemonTools pokemon={pokemon} onNavigate={this.props.onNavigate} />;
    default:
      return null;
    }
  };

  render() {
    const pokemon = this._getPokemon(this.props.pokemonId);
    const sprite = store.getSprite(this.props.pokemonId);

    return (
      <View {...this.props} style={[ styles.container, this.props.style ]}>
        <Appbar style={styles.appbar} onNavigate={this.props.onNavigate}>
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
        <TabViewAnimated
          style={styles.tabview}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        />
      </View>
    );
  }
}
