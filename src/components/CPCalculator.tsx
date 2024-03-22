import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import store from '../store';
import type { Pokemon, PokemonID } from '../types';
import Heading from './Heading';
import SpinButton from './SpinButton';

type Props = {
  pokemon: Pokemon;
  style: StyleProp<ViewStyle>;
};

function CPCalculator({ pokemon, style }: Props) {
  const navigation = useNavigation();
  const [value, setValue] = useState(Math.round(pokemon.points.max_cp / 2));

  const goToPokemon = (pokemonId: PokemonID) => {
    navigation.navigate('Info', {
      pokemonId,
    });
  };

  const onValueChange = (newValue: number) => {
    setValue(newValue);
  };

  const onIncrement = () => {
    setValue((prev) => prev + 1);
  };

  const onDecrement = () => {
    setValue((prev) => prev - 1);
  };

  if (!pokemon.evolution_cp_multipliers) {
    return (
      <View style={style}>
        <Text style={styles.text}>
          CP Calculator is not available for this Pokémon.
        </Text>
      </View>
    );
  }

  return (
    <View style={style}>
      <Heading>CP after evolution</Heading>
      <SpinButton
        value={value}
        onValueChange={onValueChange}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        style={styles.spinbutton}
      />
      <View style={styles.container}>
        {pokemon.evolution_cp_multipliers.map((it) => {
          const poke = store.getPokemon(it.id);
          const minimum = (value || 0) * it.multipliers.minimum;
          const maximum = (value || 0) * it.multipliers.maximum;
          const average = (minimum + maximum) / 2;

          if (!poke) {
            return null;
          }

          return (
            <TouchableOpacity key={it.id} onPress={() => goToPokemon(it.id)}>
              <View style={styles.pokemon}>
                <Image source={store.getSprite(it.id)} style={styles.image} />
                <Text style={[styles.text, styles.small]}>{poke.name}</Text>
                <Text style={[styles.text, styles.amount]}>
                  {Math.round(average)}
                </Text>
                <View style={styles.row}>
                  <Text style={[styles.text, styles.small, styles.value]}>
                    {Math.floor(minimum)}
                  </Text>
                  <Text style={[styles.text, styles.small]}>-</Text>
                  <Text style={[styles.text, styles.small, styles.value]}>
                    {Math.ceil(maximum)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  image: {
    margin: 8,
    height: 48,
    width: 64,
    resizeMode: 'contain',
  },

  text: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#222',
  },

  value: {
    marginHorizontal: 4,
  },

  small: {
    fontSize: 11,
  },

  amount: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    margin: 4,
  },

  spinbutton: {
    marginVertical: 12,
    width: 120,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pokemon: {
    marginVertical: 8,
    width: 120,
    alignItems: 'center',
  },
});

export default CPCalculator;
