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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 16,
  },

  title: {
    color: '#222',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 4,
  },

  description: {
    color: '#222',
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 21,
    marginVertical: 4,
  },

  statistics: {
    marginVertical: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },

  label: {
    color: '#222',
    fontFamily: 'Lato',
    fontSize: 12,
  },

  type: {
    fontWeight: 'bold',
    width: 70,
    opacity: 0.5,
  },

  amount: {
    textAlign: 'right',
    width: 50,
    marginHorizontal: 16,
  },
});


type Props = {
  pokemon: any;
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

  _goToPokemon = (pokemonId: number) => () => {
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
      <View style={styles.row}>
        <Text style={[ styles.label, styles.type ]}>{type}</Text>
        <Text style={[ styles.label, styles.amount ]}>{amount}</Text>
        <ProgressBar ratio={ratio} fillColor={fill} />
      </View>
    );
  };

  render() {
    const { pokemon } = this.props;

    return (
      <ScrollView {...this.props} style={[ styles.container, this.props.style ]}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {pokemon.category}
          </Text>
          <Text style={styles.description}>
            {pokemon.description}
          </Text>

          <View style={styles.statistics}>
            {this._renderStat('Attack', pokemon.attack / 300, pokemon.attack, '#ff8a65')}
            {this._renderStat('Defense', pokemon.defense / 200, pokemon.defense, '#9575cd')}
            {this._renderStat('Capture Rate', pokemon.capture_rate, (pokemon.capture_rate * 100).toFixed(2) + '%', '#4fc3f7')}
            {this._renderStat('Flee Rate', pokemon.flee_rate, (pokemon.flee_rate * 100).toFixed(2) + '%', '#ffd54f')}
            {this._renderStat('Max CP', pokemon.max_cp / 3904, pokemon.max_cp, '#e57373')}
            {this._renderStat('Max HP', pokemon.max_hp / 163, pokemon.max_hp, '#4db6ac')}
          </View>
        </View>
      </ScrollView>
    );
  }
}
