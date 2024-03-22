import filter from 'lodash/filter';
import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import NoResults from './NoResults';
import store from '../store';
import { Pokemon } from '../types';
import { useNavigation } from '@react-navigation/native';

type SortKey = '#' | 'name' | 'attack' | 'defense' | 'max_cp';

type State = {
  query: string;
  sort: SortKey;
  results: {
    pokemons: Pokemon[];
  };
};

export default function PokemonChooser() {
  const navigation = useNavigation();
  const [state, setState] = useState<State>({
    query: '',
    sort: '#',
    results: {
      pokemons: store.getPokemons(),
    },
  });

  const getResults = (text: string) => {
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

  const sortResults = (results: Pokemon[]) => {
    const { sort } = state;
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

  const updateResults = debounce(() => {
    setState(prevState => ({
      ...prevState,
      results: { pokemons: getResults(prevState.query) },
    }));

    listRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: false,
    });
  }, 200);

  const onSearchChange = (query: string) => {
    if (state.query === query) {
      return;
    }
    setState(prevState => ({
      ...prevState,
      query,
    }));
    updateResults();
  };

  const onChangeToggle = ({ name }: { name: SortKey }) =>
    setState(prevState => ({
      ...prevState,
      sort: name,
    }));

  const listRef = React.useRef<PokemonList>(null);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {state.results.pokemons.length ? (
        <PokemonList
          scrollsToTop
          keyboardShouldPersistTaps="handled"
          data={sortResults(state.results.pokemons)}
          navigation={navigation}
          contentContainerStyle={styles.content}
          ref={listRef}
        />
      ) : (
        <NoResults
          label="No Pokémon found"
          source={require('../../assets/images/open-pokeball.png')}
          style={styles.content}
        />
      )}
      <SearchBar
        placeholder="Find Pokémon by name, number or type"
        value={state.query}
        onChangeText={onSearchChange}
        toggles={[
          { name: '#' as const, label: '#', active: state.sort === '#' },
          {
            name: 'name' as const,
            label: 'Name',
            active: state.sort === 'name',
          },
          {
            name: 'attack' as const,
            label: 'Attack',
            active: state.sort === 'attack',
          },
          {
            name: 'defense' as const,
            label: 'Defense',
            active: state.sort === 'defense',
          },
          {
            name: 'max_cp' as const,
            label: 'Max CP',
            active: state.sort === 'max_cp',
          },
        ]}
        onChangeToggle={onChangeToggle}
        style={styles.searchbar}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    backgroundColor: '#fafafa',
  },

  searchbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
