/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';
import SearchBar from './SearchBar';
import GridView from './GridView';
import PokeCard from './PokeCard';
import data from '../data.json';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  image: {
    margin: 8,
    height: 96,
    resizeMode: 'contain',
  },

  block: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 2,
    elevation: 1,
  },

  index: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 8,
  },

  title: {
    fontFamily: 'Lato',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: 'Lato',
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
});

type State = {
  query: string;
  selected: ?number;
}

type Props = {
  onNavigate: Function;
}

export default class PokemonChooser extends Component<void, Props, State> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
  };

  state: State = {
    query: '',
    selected: null,
  };

  _handleSearchChange = (query: string) => {
    this.setState({
      query
    });
  };

  _handleCardPress = () => {
    this.props.onNavigate({
      type: 'push',
      route: {
        name: 'details',
        props: {
          index: this.state.selected,
        },
      },
    });
  };

  _renderRow = (rowData: any, sectionID: number, rowID: number) => {
    return (
      <View style={styles.block}>
        <Text style={[ styles.index, styles.subtitle ]}>#{rowID}</Text>
        <Image source={{ uri: rowData.image + '?resize_h=192&resize_w=192' }} style={styles.image} />
        <Text style={styles.title}>{rowData.name}</Text>
        <Text style={styles.subtitle}>{rowData.types.join(', ')}</Text>
      </View>
    );
  };

  _getNumberOfColumns = (width: number) => {
    return Math.floor(width / 160);
  };

  render() {
    return (
      <View style={styles.page}>
        <StatusBar backgroundColor='#ccc' />
        <SearchBar placeholder='Find a Pokémon' onChangeText={this._handleSearchChange} />
        {typeof this.state.selected === 'number' ?
          <PokeCard index={this.state.selected} onPress={this._handleCardPress} /> :
          null
        }
        <GridView
          removeClippedSubViews
          data={data}
          spacing={8}
          renderRow={this._renderRow}
          getNumberOfColumns={this._getNumberOfColumns}
        />
      </View>
    );
  }
}
