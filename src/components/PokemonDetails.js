/* @flow */

import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Heading from './Heading';
import Paragraph from './Paragraph';
import ProgressBar from './ProgressBar';
import PokemonTypeLabel from './PokemonTypeLabel';
import Attack from './Attack';
import Evolution from './Evolution';
import CPCalculator from './CPCalculator';
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
  },

  strong: {
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },

  wrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: -4,
  },

  center: {
    alignItems: 'center',
  },

  measurement: {
    width: 60,
  },

  label: {
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

export default class PokemonDetails extends Component<void, Props, void> {

  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    style: ScrollView.propTypes.style,
    onNavigate: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps: Props, nextState: void) {
    return shallowCompare(this, nextProps, nextState);
  }

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
        <Text style={[ styles.text, styles.label ]}>{type}</Text>
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
    const { pokemon } = this.props;
    const attacks = this._getAttacks(pokemon.id);
    const typeDetails = store.getTypeChart().find(({ name }) => pokemon.types.includes(name));

    return (
      <ScrollView {...this.props} style={[ styles.container, this.props.style ]}>
        <View style={styles.content}>

          <View style={styles.item}>
            <Heading selectable>{pokemon.category}</Heading>
            <Paragraph>{pokemon.description}</Paragraph>
          </View>

          <View style={styles.item}>
            {pokemon.name_origin.map(({ term, meaning }) => (
              <View key={term}>
                <Paragraph>
                  <Text style={[ styles.text, styles.strong ]}>{term}</Text>
                  <Text>{'    '}</Text>
                  <Text>{meaning}</Text>
                </Paragraph>
              </View>
            ))}
          </View>

          <View style={styles.item}>
            <View style={[ styles.row, styles.center ]}>
              <Text selectable style={[ styles.text, styles.strong, styles.measurement ]}>Height</Text>
              <Text selectable style={styles.text}>{pokemon.height.amount} {pokemon.height.unit}</Text>
            </View>
            <View style={[ styles.row, styles.center ]}>
              <Text selectable style={[ styles.text, styles.strong, styles.measurement ]}>Weight</Text>
              <Text selectable style={styles.text}>{pokemon.weight.amount} {pokemon.weight.unit}</Text>
            </View>
          </View>

          <View style={styles.item}>
            {typeDetails.strengths.length ?
              <View style={[ styles.row, styles.item ]}>
                <Text style={[ styles.text, styles.label ]}>Strong against</Text>
                <View style={styles.wrap}>
                  {typeDetails.strengths.map(type => <PokemonTypeLabel key={type} type={type} />)}
                </View>
              </View> :
              null
            }
            {typeDetails.immunes.length ?
              <View style={[ styles.row, styles.item ]}>
                <Text style={[ styles.text, styles.label ]}>Immune to</Text>
                <View style={styles.wrap}>
                  {typeDetails.immunes.map(type => <PokemonTypeLabel key={type} type={type} />)}
                </View>
              </View> :
              null
            }
            {typeDetails.weaknesses.length ?
              <View style={[ styles.row, styles.item ]}>
                <Text style={[ styles.text, styles.label ]}>Weak against</Text>
                <View style={styles.wrap}>
                  {typeDetails.weaknesses.map(type => <PokemonTypeLabel key={type} type={type} />)}
                </View>
              </View> :
              null
            }
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

          {pokemon.evolution_chains ?
            <View style={styles.item}>
              <Evolution
                style={styles.item}
                pokemon={pokemon}
                onNavigate={this.props.onNavigate}
              />
            </View> :
            null
          }

          {pokemon.evolution_cp_multipliers ?
            <View style={styles.item}>
              <CPCalculator
                style={styles.item}
                pokemon={pokemon}
                onNavigate={this.props.onNavigate}
              />
            </View> :
            null
          }

          {pokemon.easter_eggs ?
            <View style={styles.item}>
              <Heading>{pokemon.easter_eggs.length > 1 ? 'Tips' : 'Tip'}</Heading>

              {pokemon.easter_eggs.map(tip => (
                <View key={tip}>
                  <Paragraph>{tip}</Paragraph>
                </View>
              ))}
            </View> :
            null
          }
        </View>
      </ScrollView>
    );
  }
}
