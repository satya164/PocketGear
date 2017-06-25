/* @flow */

import filter from 'lodash/filter';
import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';
import {
  Animated,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
} from 'react-native';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import NoResults from './NoResults';
import store from '../store';
import FilterToggle from './FilterToggle';
import AppbarShell from './AppbarShell';
import type {
  Pokemon,
} from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  searchbar: {
    backgroundColor: '#fff',
  },

  filters: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 56,
    left: 0,
    right: 0,
    paddingBottom: 8,
  },

  row: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
});

type SortKey = '#' | 'name' | 'attack' | 'defense' | 'max_cp'

type State = {
  query: string;
  sort: SortKey;
  filters: boolean;
  focused: Animated.Value;
  results: {
    pokemons: Array<Pokemon>;
  };
}

type Props = {
  navigation: Object;
}

export default class PokemonChooser extends PureComponent<void, Props, State> {
  state: State = {
    query: '',
    sort: '#',
    filters: false,
    focused: new Animated.Value(0),
    results: {
      pokemons: store.getPokemons(),
    },
  };

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this._handleFocus);
    Keyboard.addListener('keyboardDidHide', this._handleBlur);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this._handleFocus);
    Keyboard.removeListener('keyboardDidHide', this._handleBlur);
  }

  _getResults = (text: string) => {
    const query = text.toLowerCase().trim();
    const pokemons = store.getPokemons();

    if (query) {
      if (!isNaN(query)) {
        return filter(pokemons, p => p.id === parseInt(query, 10));
      }
      return filter(pokemons, (pokemon => {
        return (
          /* String#startsWith doesn't work properly for unicode */
          pokemon.name.toLowerCase().indexOf(query) === 0 ||
          query.split(',').map(q => q.trim()).every(q =>
            pokemon.types.some(type => type.toLowerCase().indexOf(q) === 0)
          )
        );
      }));
    }

    return pokemons;
  };

  _sortResults = (results: Array<Pokemon>) => {
    const { sort } = this.state;
    return results.slice(0).sort((a, b) => {
      switch (sort) {
      case '#':
        return a.id - b.id;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'attack':
        return b.stats.attack - a.stats.attack;
      case 'defense':
        return b.stats.defense - a.stats.defense;
      case 'max_cp':
        return b.points.max_cp - a.points.max_cp;
      default:
        return 0;
      }
    });
  }

  _updateResults = debounce(() => {
    const pokemons = this._getResults(this.state.query);
    this.setState({
      results: { pokemons },
    }, () => {
      if (this._list) {
        this._list.scrollTo({
          x: 0,
          y: 0,
          animated: false,
        });
      }
    });
  }, 200);

  _handleSearchChange = (query: string) => {
    if (this.state.query === query) {
      return;
    }
    this.setState({
      query,
    });
    this._updateResults();
  };

  _handleFocus = () => {
    this.setState({ filters: true });
    Animated.spring(this.state.focused, {
      toValue: 1,
      tension: 300,
      friction: 35,
    }).start();
  };

  _handleBlur = () => {
    this.setState({ filters: false });
    Animated.spring(this.state.focused, {
      toValue: 0,
      tension: 300,
      friction: 35,
    }).start();
  };

  _setSortType = (sort: SortKey) => () => this.setState({ sort });

  _list: ?Object;

  _setRef = (c: Object) => (this._list = c);

  _unsetRef = () => (this._list = null);

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <SearchBar
          placeholder='Find Pokémon by name, number or type'
          value={this.state.query}
          onChangeText={this._handleSearchChange}
          style={styles.searchbar}
        />
        <View style={styles.content}>
          {this.state.results.pokemons.length ?
            <PokemonList
              scrollsToTop
              keyboardShouldPersistTaps='handled'
              data={{ pokemons: this._sortResults(this.state.results.pokemons) }}
              navigation={this.props.navigation}
              ref={this._setRef}
            /> :
            <NoResults
              label='No Pokémon found'
              source={require('../../assets/images/open-pokeball.png')}
              ref={this._unsetRef}
            />
          }
        </View>
        <Animated.View
          style={[ styles.filters, { opacity: this.state.focused } ]}
          pointerEvents={this.state.filters ? 'auto' : 'none'}
        >
          <AppbarShell style={styles.row}>
            <FilterToggle
              active={this.state.sort === '#'}
              label='#'
              onPress={this._setSortType('#')}
            />
            <FilterToggle
              active={this.state.sort === 'name'}
              label='Name'
              onPress={this._setSortType('name')}
            />
            <FilterToggle
              active={this.state.sort === 'attack'}
              label='Attack'
              onPress={this._setSortType('attack')}
            />
            <FilterToggle
              active={this.state.sort === 'defense'}
              label='Defense'
              onPress={this._setSortType('defense')}
            />
            <FilterToggle
              active={this.state.sort === 'max_cp'}
              label='Max CP'
              onPress={this._setSortType('max_cp')}
            />
          </AppbarShell>
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
}
