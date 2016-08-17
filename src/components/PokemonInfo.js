/* @flow */

import find from 'lodash/find';
import memoize from 'lodash/memoize';
import React, { PropTypes, Component } from 'react';
import {
  Image,
  InteractionManager,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { TabViewAnimated, TabViewPage, TabBarTop } from 'react-native-tab-view';
import PokemonTypeLabel from './PokemonTypeLabel';
import Placeholder from './Placeholder';
import PokemonDetails from './PokemonDetails';
import WeakAgainstList from './WeakAgainstList';
import StrongAgainstList from './StrongAgainstList';
import store from '../store';
import type {
  PokemonID,
  Pokemon,
} from '../typeDefinitions';

const BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: BAR_HEIGHT,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },

  icon: {
    color: '#222',
  },

  button: {
    height: BAR_HEIGHT,
    width: BAR_HEIGHT - 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    flex: 1,
    color: '#222',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontFamily: 'Montserrat',
    fontSize: Platform.OS === 'ios' ? 16 : 18,
    margin: 8,
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
    fontWeight: 'bold',
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
  },

  tablabel: {
    color: '#222',
    fontFamily: 'Montserrat',
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 8,
  },

  indicator: {
    backgroundColor: '#222',
  },
});

type Route = {
  key: string;
  title: string;
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
      { key: 'weak-against', title: 'Weak against' },
      { key: 'strong-against', title: 'Strong against' },
      { key: 'details', title: 'Details' },
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
    return <Text style={styles.tablabel}>{route.title.toUpperCase()}</Text>;
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
    case 'weak-against':
      return <WeakAgainstList pokemon={pokemon} onNavigate={this.props.onNavigate} />;
    case 'strong-against':
      return <StrongAgainstList pokemon={pokemon} onNavigate={this.props.onNavigate} />;
    case 'details':
      return <PokemonDetails pokemon={pokemon} onNavigate={this.props.onNavigate} />;
    default:
      return null;
    }
  };

  _renderPage = (props: any) => {
    return <TabViewPage {...props} renderScene={this._renderScene} />;
  };

  _handleGoBack = () => {
    this.props.onNavigate({ type: 'pop' });
  };

  render() {
    const pokemon = this._getPokemon(this.props.pokemonId);
    const sprite = store.getSprite(this.props.pokemonId);

    return (
      <View {...this.props} style={[ styles.container, this.props.style ]}>
        <View style={styles.appbar}>
          <TouchableOpacity style={styles.button} onPress={this._handleGoBack}>
            {Platform.OS === 'ios' ?
              <EvilIcons
                name='chevron-left'
                size={36}
                style={styles.icon}
              /> :
              <MaterialIcons
                name='arrow-back'
                size={24}
                style={styles.icon}
              />
            }
          </TouchableOpacity>
          <Text style={styles.title}>#{pokemon.id}</Text>
          <View style={styles.button} />
        </View>
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
          renderScene={this._renderPage}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        />
      </View>
    );
  }
}
