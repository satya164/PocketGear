/* @flow */

import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import type { Move } from '../typeDefinitions';

const styles = StyleSheet.create({
  spacer: {
    flex: 1,
  },

  text: {
    color: '#222',
    fontFamily: 'Montserrat',
    fontSize: 13,
    lineHeight: 20,
  },

  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },

  type: {
    width: 120,
  },

  energy: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4fc3f7',
    marginHorizontal: 2,
    marginVertical: 10,
  },

  damage: {
    width: 80,
    alignItems: 'flex-end',
  },

  subtitle: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    color: '#999',
    marginVertical: 4,
  },

  numbers: {
    fontSize: 10,
  },
});

type Props = {
  move: Move;
}

export default class Attack extends PureComponent<void, Props, void> {

  static propTypes = {
    move: PropTypes.object.isRequired,
  };

  render() {
    const { move } = this.props;

    return (
      <View style={styles.row}>
        <View style={styles.type}>
          <Text style={styles.text}>
            {move.name}
          </Text>
          <Text style={styles.subtitle}>
            {move.type}
          </Text>
        </View>
        {!move.quick && move.energy_delta ? Array.from({ length: Math.abs(Math.round(100 / move.energy_delta)) }).map((_, i) => {
          return <View key={i} style={styles.energy} />;
        }) : <View style={styles.spacer} />}
        <View style={styles.damage}>
          <Text style={styles.text}>
            {(move.power / (move.duration / 1000)).toFixed(1)} dps
          </Text>
          <Text style={[ styles.subtitle, styles.numbers ]}>
            {move.power} / {(move.duration / 1000)} s
          </Text>
        </View>
      </View>
    );
  }
}
