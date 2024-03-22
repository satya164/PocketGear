import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { usePokemon } from '../contexts/PokemonContext';
import CPCalculator from './CPCalculator';

function PokemonTools() {
  const pokemon = usePokemon();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CPCalculator style={styles.item} pokemon={pokemon} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 16,
  },

  item: {
    marginVertical: 16,
  },
});

export default PokemonTools;
