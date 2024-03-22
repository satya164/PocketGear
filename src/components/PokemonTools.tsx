import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CPCalculator from './CPCalculator';
import { Pokemon } from '../types';

type Props = {
  pokemon: Pokemon;
  style?: StyleProp<ViewStyle>;
  navigation: any;
};

function PokemonTools({ pokemon, style, navigation, ...rest }: Props) {
  return (
    <ScrollView {...rest} style={[styles.container, style]}>
      <View style={styles.content}>
        <CPCalculator
          style={styles.item}
          pokemon={pokemon}
          navigation={navigation}
        />
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
