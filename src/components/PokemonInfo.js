/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { TabViewAnimated, TabViewPage, TabBarTop } from 'react-native-tab-view';
import PokemonDetails from './PokemonDetails';
import WeakAgainstList from './WeakAgainstList';
import StrongAgainstList from './StrongAgainstList';
import sprites from '../sprites';
import db from '../db';

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
    width: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    flex: 1,
    color: '#222',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontFamily: 'Lato',
    fontSize: Platform.OS === 'ios' ? 16 : 18,
    marginHorizontal: 8,
  },

  image: {
    marginHorizontal: 8,
    height: 72,
    resizeMode: 'contain',
  },

  name: {
    color: '#222',
    fontFamily: 'Lato',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 2,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  meta: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  label: {
    color: '#222',
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.5,
    width: 72,
    marginVertical: 2,
  },

  info: {
    color: '#222',
    fontFamily: 'Lato',
    fontSize: 13,
    marginVertical: 2,
  },

  tabview: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },

  tabbar: {
    backgroundColor: '#fff',
    elevation: 1,
  },

  tablabel: {
    color: '#222',
    fontFamily: 'Lato',
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

type NavigationState = {
  index: number;
  routes: Array<Route>;
}

type Props = {
  onNavigate: Function;
  pokemonId: number;
  style?: any;
}

type State = {
  navigation: NavigationState;
  pokemon: any;
}

export default class PokemonInfo extends Component<void, Props, State> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemonId: PropTypes.number.isRequired,
    style: ScrollView.propTypes.style,
  };

  state: State = {
    navigation: {
      index: 0,
      routes: [
        { key: 'strong-against', title: 'Strong against' },
        { key: 'weak-against', title: 'Weak against' },
        { key: 'details', title: 'Details' },
      ],
    },
    pokemon: null,
  };

  componentWillMount() {
    const { pokemonId } = this.props;
    const pokemon = db.objects('Pokemon').filtered(`id == "${pokemonId}"`);

    this.setState({
      pokemon: pokemon[0],
    });
  }

  _handleChangeTab = (index: number) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
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
    switch (route.key) {
    case 'weak-against':
      return <WeakAgainstList pokemon={this.state.pokemon} onNavigate={this.props.onNavigate} />;
    case 'strong-against':
      return <StrongAgainstList pokemon={this.state.pokemon} onNavigate={this.props.onNavigate} />;
    case 'details':
      return <PokemonDetails pokemon={this.state.pokemon} onNavigate={this.props.onNavigate} />;
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
    const { pokemon } = this.state.pokemon;
    const types = pokemon.type.map(t => t.name).join(', ');

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
          <View>
            <Text style={styles.name}>{pokemon.name}</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Type</Text>
              <Text style={styles.info}>{types}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Category</Text>
              <Text style={styles.info}>Seed Pokémon</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Weakness</Text>
              <Text style={styles.info}>Fire</Text>
            </View>
          </View>
          <Image style={styles.image} source={sprites[pokemon.id - 1]} />
        </View>
        <TabViewAnimated
          style={styles.tabview}
          navigationState={this.state.navigation}
          renderScene={this._renderPage}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        />
      </View>
    );
  }
}
