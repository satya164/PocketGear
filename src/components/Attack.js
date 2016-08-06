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
    fontFamily: 'Lato',
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
    marginVertical: 8,
  },

  damage: {
    width: 60,
    alignItems: 'flex-end',
  },

  subtitle: {
    fontSize: 12,
    opacity: 0.5,
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
          <Text style={[ styles.text, styles.subtitle ]}>
            {attack.type}
          </Text>
        </View>
        {attack.energy_requirement ? Array.from({ length: attack.energy_requirement }).map((_, i) => {
          return <View key={i} style={styles.energy} />;
        }) : <View style={styles.spacer} />}
        <View style={styles.damage}>
          <Text style={styles.text}>
            {attack.damage}
          </Text>
          <Text style={[ styles.text, styles.subtitle ]}>
            {attack.duration / 1000}s
          </Text>
        </View>
      </View>
    );
  }
}
