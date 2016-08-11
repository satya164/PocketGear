/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import sprites from '../sprites';
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

  title: {
    fontWeight: 'bold',
  },

  small: {
    fontSize: 11,
  },

  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 4,
  },

  input: {
    textAlign: 'center',
    height: 44,
    width: 60,
    padding: 8,
    marginVertical: 0,
    marginHorizontal: 8,
  },

  button: {
    backgroundColor: 'rgba(0, 0, 0, .06)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
    borderRadius: 12,
  },

  icon: {
    color: '#222',
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

export default class CPCalculator extends Component<void, Props, State> {

  static propTypes = {
    pokemon: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: Math.round(this.props.pokemon.max_cp / 3),
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

  _handleChange = (text: string) => {
    this.setState({
      value: parseInt(text, 10),
    });
  };

  _handleIncrement = () => {
    this.setState({
      value: this.state.value + 1,
    });
  };

  _handleDecrement = () => {
    if (this.state.value > 1) {
      this.setState({
        value: this.state.value - 1,
      });
    }
  };

  render() {
    const { pokemon } = this.props;

    const pokemons = store.getPokemons();

    return (
      <View {...this.props}>
        <Text style={[ styles.text, styles.title ]}>CP after evolution</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={this._handleDecrement} style={styles.button}>
            <MaterialIcons
              name='remove'
              size={16}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TextInput
            keyboardType='numeric'
            value={isNaN(this.state.value) ? '' : this.state.value.toString()}
            onChangeText={this._handleChange}
            style={[ styles.text, styles.input ]}
          />
          <TouchableOpacity onPressIn={this._handleIncrement} style={styles.button}>
            <MaterialIcons
              name='add'
              size={16}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {pokemon.evolution_cp_multipliers ? pokemon.evolution_cp_multipliers.map(it => {
            const poke = pokemons.find(p => p.id === it.id);
            const minimum = (this.state.value || 0) * it.multipliers.minimum;
            const maximum = (this.state.value || 0) * it.multipliers.maximum;
            const average = (minimum + maximum) / 2;
            return (
              <TouchableOpacity key={it.id} onPress={() => this._goToPokemon(it.id)}>
                <View style={styles.pokemon}>
                    <Image source={sprites[it.id - 1]} style={styles.image} />
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
          }) : null}
        </View>
      </View>
    );
  }
}
