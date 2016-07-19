/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import SearchBar from './SearchBar';
import PokeCard from './PokeCard';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
    selected: 135,
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

  render() {
    return (
      <View style={styles.page}>
        <SearchBar placeholder='Find a Pokémon' onChangeText={this._handleSearchChange} />
        <PokeCard index={this.state.selected} onPress={this._handleCardPress} />
      </View>
    );
  }
}
