/* @flow */

import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Heading from './Heading';
import SpinButton from './SpinButton';
import store from '../store';
import type {
  Pokemon,
  PokemonID,
} from '../typeDefinitions';

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
    fontFamily: 'MontserratBold',
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

type Props = {
  pokemon: Pokemon;
  onNavigate: Function;
}

type State = {
  value: number;
}

export default class CPCalculator extends PureComponent<void, Props, State> {

  static propTypes = {
    pokemon: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: Math.round(this.props.pokemon.points.max_cp / 2),
    };
  }

  state: State;

  _goToPokemon = (pokemonId: PokemonID) => {
    this.props.onNavigate({
      type: 'push',
      route: {
        name: 'info',
        props: {
          pokemonId,
        },
      },
    });
  };

  _handleChangeValue = (value: number) => {
    this.setState({
      value,
    });
  };

  render() {
    const { pokemon } = this.props;

    const pokemons = store.getPokemons();

    if (!pokemon.evolution_cp_multipliers) {
      return (
        <View {...this.props}>
          <Text style={styles.text}>
            CP Calculator is not available for this Pokémon.
          </Text>
        </View>
      );
    }

    return (
      <View {...this.props}>
        <Heading>CP after evolution</Heading>
        <SpinButton
          value={this.state.value}
          onChangeValue={this._handleChangeValue}
          style={styles.spinbutton}
        />
        <View style={styles.container}>
          {pokemon.evolution_cp_multipliers.map(it => {
            const poke = pokemons.find(p => p.id === it.id);
            const minimum = (this.state.value || 0) * it.multipliers.minimum;
            const maximum = (this.state.value || 0) * it.multipliers.maximum;
            const average = (minimum + maximum) / 2;
            if (!poke) {
              return null;
            }
            return (
              <TouchableOpacity key={it.id} onPress={() => this._goToPokemon(it.id)}>
                <View style={styles.pokemon}>
                    <Image source={store.getSprite(it.id)} style={styles.image} />
                    <Text style={[ styles.text, styles.small ]}>
                      {poke.name}
                    </Text>
                    <Text style={[ styles.text, styles.amount ]}>{Math.round(average)}</Text>
                    <View style={styles.row}>
                      <Text style={[ styles.text, styles.small, styles.value ]}>{Math.floor(minimum)}</Text>
                      <Text style={[ styles.text, styles.small ]}>-</Text>
                      <Text style={[ styles.text, styles.small, styles.value ]}>{Math.ceil(maximum)}</Text>
                    </View>
                  </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}
