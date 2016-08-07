/* @flow */

import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ProgressBar from './ProgressBar';
import Placeholder from './Placeholder';
import Attack from './Attack';
import Evolution from './Evolution';
import store from '../store';
import type {
  Pokemon,
  PokemonID,
  QuickAttack,
  SpecialAttack,
} from '../typeDefinitions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 16,
  },

  item: {
    marginVertical: 8,
  },

  text: {
    color: '#222',
    fontFamily: 'Montserrat',
    fontSize: 13,
    lineHeight: 20,
  },

  strong: {
    fontWeight: 'bold',
  },

  description: {
    lineHeight: 20,
    marginVertical: 4,
  },

  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },

  center: {
    alignItems: 'center',
  },

  label: {
    width: 60,
  },

  type: {
    width: 120,
  },

  amount: {
    textAlign: 'right',
    width: 60,
  },
});


type Props = {
  pokemon: Pokemon;
  style?: any;
  onNavigate: Function;
}

type State = {
  loading: boolean;
}

export default class PokemonDetails extends Component<void, Props, State> {

  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    style: ScrollView.propTypes.style,
    onNavigate: PropTypes.func.isRequired,
  };

  state: State = {
    loading: true,
  };

  componentDidMount() {
    // FIXME: InteractionManager seems buggy - #8624
    setTimeout(this._setLoading, 200);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return shallowCompare(this, nextProps, nextState);
  }

  _setLoading = () => {
    this.setState({ loading: false });
  };

  _goToPokemon = (pokemonId: PokemonID) => () => {
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

  _renderStat = (type: string, ratio: number, amount: string | number, fill: string) => {
    return (
      <View style={[ styles.row, styles.center ]}>
        <Text style={[ styles.text, styles.type ]}>{type}</Text>
        <ProgressBar ratio={ratio} fillColor={fill} />
        <Text style={[ styles.text, styles.amount ]}>{amount}</Text>
      </View>
    );
  };

  _renderAttack = (attack: QuickAttack | SpecialAttack) => {
    return (
      <Attack
        key={attack.name}
        style={styles.row}
        attack={attack}
      />
    );
  };

  _getAttacks = (id: number) => {
    const quickAttacks = store.getQuickAttacks();
    const specialAttacks = store.getSpecialAttacks();

    return {
      quick: quickAttacks.filter(attack => attack.known_by.includes(id)).sort((a, b) => b.damage - a.damage),
      special: specialAttacks.filter(attack => attack.known_by.includes(id)).sort((a, b) => b.damage - a.damage),
    };
  };

  render() {
    if (this.state.loading) {
      return <Placeholder />;
    }

    const { pokemon } = this.props;
    const attacks = this._getAttacks(pokemon.id);

    return (
      <ScrollView {...this.props} style={[ styles.container, this.props.style ]}>
        <View style={styles.content}>

          <View style={styles.item}>
            <View style={[ styles.row, styles.center ]}>
              <Text style={[ styles.text, styles.strong, styles.label ]}>Height</Text>
              <Text style={styles.text}>{pokemon.height.amount} {pokemon.height.unit}</Text>
            </View>
            <View style={[ styles.row, styles.center ]}>
              <Text style={[ styles.text, styles.strong, styles.label ]}>Weight</Text>
              <Text style={styles.text}>{pokemon.weight.amount} {pokemon.weight.unit}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={[ styles.text, styles.strong ]}>
              {pokemon.category}
            </Text>

            <Text style={[ styles.text, styles.description ]}>
              {pokemon.description}
            </Text>
          </View>

          <View style={styles.item}>
            {attacks.quick.map(this._renderAttack)}
            {attacks.special.map(this._renderAttack)}
          </View>

          <View style={styles.item}>
            {this._renderStat('Attack', pokemon.attack / 300, pokemon.attack, '#ff8a65')}
            {this._renderStat('Defense', pokemon.defense / 200, pokemon.defense, '#9575cd')}
            {this._renderStat('Capture Rate', pokemon.capture_rate, (pokemon.capture_rate * 100).toFixed(2) + '%', '#f06292')}
            {this._renderStat('Flee Rate', pokemon.flee_rate, (pokemon.flee_rate * 100).toFixed(2) + '%', '#ffd54f')}
            {this._renderStat('Max CP', pokemon.max_cp / 3904, pokemon.max_cp, '#e57373')}
            {this._renderStat('Max HP', pokemon.max_hp / 163, pokemon.max_hp, '#4db6ac')}
          </View>

          {pokemon.evolution_chain ?
            <Evolution
              style={styles.item}
              evolutionChain={pokemon.evolution_chain}
              evolutionRequirements={pokemon.evolution_requirements}
              onNavigate={this.props.onNavigate}
            /> :
            null
          }
        </View>
      </ScrollView>
    );
  }
}
