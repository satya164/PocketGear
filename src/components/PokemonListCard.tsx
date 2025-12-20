import { PlatformPressable } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import store from '../store';
import type { Pokemon } from '../types';

type Props = {
  pokemon: Pokemon;
  style?: StyleProp<ViewStyle>;
};

function PokemonListCardInner({ pokemon, style }: Props) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Info', {
      pokemonId: pokemon.id,
    });
  };

  const types = pokemon.types.join(', ');
  const color = store.getColor(pokemon.types[0]);
  const sprite = store.getSprite(pokemon.id);

  return (
    <PlatformPressable
      key={pokemon.name}
      onPress={onPress}
      pressOpacity={0.7}
      style={[styles.block, { backgroundColor: color }, style]}
    >
      <Text style={[styles.index, styles.subtitle]}>#{pokemon.id}</Text>
      <Image source={sprite} resizeMode="contain" style={styles.image} />
      <Text style={styles.title}>{pokemon.name}</Text>
      <Text style={styles.subtitle}>{types}</Text>
    </PlatformPressable>
  );
}

const PokemonListCard = React.memo(PokemonListCardInner);

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 2,
  },

  image: {
    margin: 16,
    height: 72,
  },

  index: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 8,
  },

  title: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.7,
  },

  subtitle: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.5,
  },
});

export default PokemonListCard;
