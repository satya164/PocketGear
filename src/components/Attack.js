/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import type {
  QuickAttack,
  SpecialAttack,
} from '../typeDefinitions';

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
    marginVertical: 6,
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
  attack: QuickAttack | SpecialAttack;
}

export default class Attack extends Component<void, Props, void> {

  static propTypes = {
    attack: PropTypes.object.isRequired,
  };

  render() {
    const { attack } = this.props;

    return (
      <View style={styles.row}>
        <View style={styles.type}>
          <Text style={styles.text}>
            {attack.name}
          </Text>
          <Text style={styles.subtitle}>
            {attack.type}
          </Text>
        </View>
        {typeof (attack: any).energy_requirement === 'number' ? Array.from({ length: (attack: any).energy_requirement }).map((_, i) => {
          return <View key={i} style={styles.energy} />;
        }) : <View style={styles.spacer} />}
        <View style={styles.damage}>
          <Text style={styles.text}>
            {(attack.damage / (attack.duration / 1000)).toFixed(1)} dps
          </Text>
          <Text style={[ styles.subtitle, styles.numbers ]}>
            {attack.damage} / {(attack.duration / 1000)} s
          </Text>
        </View>
      </View>
    );
  }
}
