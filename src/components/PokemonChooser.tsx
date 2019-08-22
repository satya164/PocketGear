import filter from 'lodash/filter';
import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import NoResults from './NoResults';
import store from '../store';
import { Pokemon } from '../types';

type SortKey = '#' | 'name' | 'attack' | 'defense' | 'max_cp';

type State = {
  query: string;
  sort: SortKey;
  results: {
    pokemons: Pokemon[];
  };
};

type Props = {
  navigation: any;
};

export default class PokemonChooser extends PureComponent<Props, State> {
  state: State = {
    query: '',
    sort: '#',
    results: {
      pokemons: store.getPokemons(),
    },
  };

  _getResults = (text: string) => {
    const query = text.toLowerCase().trim();
    const pokemons = store.getPokemons();

    if (query) {
      if (!isNaN(Number(query))) {
        return filter(pokemons, p => p.id === parseInt(query, 10));
      }
      return filter(pokemons, pokemon => {
        return (
          /* String#startsWith doesn't work properly for unicode */
          pokemon.name.toLowerCase().indexOf(query) === 0 ||
          query
            .split(',')
            .map(q => q.trim())
            .every(q =>
              pokemon.types.some(type => type.toLowerCase().indexOf(q) === 0)
            )
        );
      });
    }

    return pokemons;
  };

  _sortResults = (results: Pokemon[]) => {
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
  };

  _updateResults = debounce(() => {
    this.setState(
      state => ({
        results: { pokemons: this._getResults(state.query) },
      }),
      () => {
        if (this._list) {
          this._list.scrollTo({
            x: 0,
            y: 0,
            animated: false,
          });
        }
      }
    );
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

  _handleChangeToggle = ({ name }: { name: SortKey }) =>
    this.setState({ sort: name });

  _list: any | undefined;

  _setRef = (c: any) => (this._list = c);

  _unsetRef = () => (this._list = null);

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        {this.state.results.pokemons.length ? (
          <PokemonList
            scrollsToTop
            keyboardShouldPersistTaps="handled"
            data={this._sortResults(this.state.results.pokemons)}
            navigation={this.props.navigation}
            contentContainerStyle={styles.content}
            ref={this._setRef}
          />
        ) : (
          <NoResults
            label="No Pokémon found"
            source={require('../../assets/images/open-pokeball.png')}
            style={styles.content}
            ref={this._unsetRef}
          />
        )}
        <SearchBar
          placeholder="Find Pokémon by name, number or type"
          value={this.state.query}
          onChangeText={this._handleSearchChange}
          toggles={[
            { name: '#' as const, label: '#', active: this.state.sort === '#' },
            {
              name: 'name' as const,
              label: 'Name',
              active: this.state.sort === 'name',
            },
            {
              name: 'attack' as const,
              label: 'Attack',
              active: this.state.sort === 'attack',
            },
            {
              name: 'defense' as const,
              label: 'Defense',
              active: this.state.sort === 'defense',
            },
            {
              name: 'max_cp' as const,
              label: 'Max CP',
              active: this.state.sort === 'max_cp',
            },
          ]}
          onChangeToggle={this._handleChangeToggle}
          style={styles.searchbar}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    backgroundColor: '#fafafa',
    paddingTop: SearchBar.HEIGHT + 4,
  },

  searchbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
