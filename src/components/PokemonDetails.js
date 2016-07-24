/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabViewAnimated, TabViewPage, TabBarTop } from 'react-native-tab-view';
import colors from '../colors.json';
import sprites from '../sprites';
import db from '../db';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },

  button: {
    padding: 12,
  },

  title: {
    fontFamily: 'Lato',
    fontSize: 18,
    marginHorizontal: 8,
  },

  image: {
    marginHorizontal: 8,
    height: 72,
    resizeMode: 'contain',
  },

  name: {
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
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.5,
    width: 72,
    marginVertical: 2,
  },

  info: {
    fontFamily: 'Lato',
    fontSize: 13,
    marginVertical: 2,
  },

  tabview: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  tabbar: {
    backgroundColor: '#fff',
    elevation: 1,
  },

  tablabel: {
    fontFamily: 'Lato',
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 8,
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
}

export default class PokemonDetails extends Component<void, Props, State> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemonId: PropTypes.number.isRequired,
    style: ScrollView.propTypes.style,
  };

  state: State = {
    navigation: {
      index: 0,
      routes: [
        { key: '1', title: 'Weak against' },
        { key: '2', title: 'Strong against' },
        { key: '3', title: 'Details' },
      ],
    },
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

  _getColor = () => {
    const types = this.state.pokemon.type.map(t => t);
    const typeColor = types[0].name.toLowerCase() + 'Dark';
    return colors[typeColor] || colors.normalDark;
  };

  _renderLabel = ({ route }: { route: Route }) => {
    return <Text style={[ styles.tablabel, { color: this._getColor() } ]}>{route.title.toUpperCase()}</Text>;
  }

  _renderHeader = (props: any) => {
    return (
      <TabBarTop
        {...props}
        renderLabel={this._renderLabel}
        indicatorStyle={{ backgroundColor: this._getColor() }}
        style={styles.tabbar}
      />
    );
  };

  _renderScene = () => {
    return <View />;
  };

  _renderPage = (props: any) => {
    return <TabViewPage {...props} renderScene={this._renderScene} />;
  };

  _handleGoBack = () => {
    this.props.onNavigate({ type: 'pop' });
  };

  render() {
    const color = this._getColor();
    const {pokemon} = this.state;

    return (
      <View {...this.props} style={[ styles.container, this.props.style ]}>
        <View style={styles.appbar}>
          <TouchableOpacity style={styles.button} onPress={this._handleGoBack}>
            <Icon
              name='arrow-back'
              size={24}
              style={{ color }}
            />
          </TouchableOpacity>
          <Text style={[ styles.title, { color } ]}>#{pokemon.id}</Text>
        </View>
        <View style={[ styles.row, styles.meta ]}>
          <View>
            <Text style={[ styles.name, { color } ]}>{pokemon.name}</Text>
            <View style={styles.row}>
              <Text style={[ styles.label, { color } ]}>Type</Text>
              <Text style={[ styles.info, { color } ]}>
                {pokemon.type.map(t => t.name).join(', ')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[ styles.label, { color } ]}>Category</Text>
              <Text style={[ styles.info, { color } ]}>Seed Pokémon</Text>
            </View>
            <View style={styles.row}>
              <Text style={[ styles.label, { color } ]}>Weakness</Text>
              <Text style={[ styles.info, { color } ]}>Fire</Text>
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
