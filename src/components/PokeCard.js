/* @flow */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 8,
    padding: 8,
    borderRadius: 2,
    elevation: 1,
  },

  image: {
    marginHorizontal: 8,
    height: 64,
    width: 64,
    resizeMode: 'contain',
  },

  details: {
    padding: 8,
  },

  name: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },

  type: {
    fontFamily: 'Lato',
    fontSize: 12,
    color: '#999',
  }
});

export default class PokeCard extends Component {
  render() {
    return (
      <View {...this.props} style={[ styles.card, this.props.style ]}>
        <Image
          style={styles.image}
          source={require('../../assets/jolteon.png')}
        />
        <View style={styles.details}>
          <Text style={styles.name}>
            Jolteon
          </Text>
          <Text style={styles.type}>
            Electricity
          </Text>
        </View>
      </View>
    )
  }
}
