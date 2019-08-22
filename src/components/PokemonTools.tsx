import React, { PureComponent } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CPCalculator from './CPCalculator';
import { Pokemon, PokemonID } from '../types';

type Props = {
  pokemon: Pokemon;
  style?: StyleProp<ViewStyle>;
  navigation: any;
};

export default class PokemonTools extends PureComponent<Props> {
  _goToPokemon = (pokemonId: PokemonID) => () => {
    this.props.navigation.push('Info', {
      pokemonId,
    });
  };

  render() {
    return (
      <ScrollView {...this.props} style={[styles.container, this.props.style]}>
        <View style={styles.content}>
          <CPCalculator
            style={styles.item}
            pokemon={this.props.pokemon}
            navigation={this.props.navigation}
          />
        </View>
      </ScrollView>
    );
  }
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
