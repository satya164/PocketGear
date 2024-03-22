import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import store from '../store';
import { type Pokemon } from '../types';
import NoResults from './NoResults';
import PokemonList from './PokemonList';
import SearchBar from './SearchBar';

type SortKey = '#' | 'name' | 'attack' | 'defense' | 'max_cp';

type State = {
  query: string;
  sort: SortKey;
  results: {
    pokemons: Pokemon[];
  };
};

export default function PokemonChooser() {
  const insets = useSafeAreaInsets();
  const [state, setState] = useState<State>({
    query: '',
    sort: '#',
    results: {
      pokemons: store.getAllPokemons(),
    },
  });

  const getResults = (text: string) => {
    const query = text.toLowerCase().trim();
    const pokemons = store.getAllPokemons();

    if (query) {
      if (!isNaN(Number(query))) {
        return pokemons.filter((p) => p.id === parseInt(query, 10));
      }

      return pokemons.filter((pokemon) => {
        return (
          /* String#startsWith doesn't work properly for unicode */
          pokemon.name.toLowerCase().indexOf(query) === 0 ||
          query
            .split(',')
            .map((q) => q.trim())
            .every((q) =>
              pokemon.types.some((type) => type.toLowerCase().indexOf(q) === 0)
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
    setState((prevState) => ({
      ...prevState,
      results: { pokemons: getResults(prevState.query) },
    }));

    listRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }, 200);

  const onSearchChange = (query: string) => {
    if (state.query === query) {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      query,
    }));
    updateResults();
  };

  const onChangeToggle = ({ name }: { name: SortKey }) =>
    setState((prevState) => ({
      ...prevState,
      sort: name,
    }));

  const listRef = React.useRef<FlatList>(null);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {state.results.pokemons.length ? (
        <PokemonList
          scrollsToTop
          keyboardShouldPersistTaps="handled"
          data={sortResults(state.results.pokemons)}
          contentContainerStyle={[
            styles.content,
            {
              paddingTop:
                Platform.select({
                  ios: 50,
                  default: 60,
                }) + insets.top,
            },
          ]}
          ref={listRef}
        />
      ) : (
        <NoResults
          label="No Pokémon found"
          source={require('../../assets/images/open-pokeball.png')}
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
