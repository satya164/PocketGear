/* @flow */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
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
    height: 84,
    width: 84,
    resizeMode: 'contain',
  },

  details: {
    padding: 8,
  },

  item: {
    flexDirection: 'row',
    marginVertical: 2,
  },

  name: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },

  label: {
    fontFamily: 'Lato',
    fontSize: 12,
    color: '#aaa',
    marginRight: 8,
  },

  summary: {
    fontFamily: 'Lato',
    fontSize: 12,
    color: '#333',
  }
});

export default class PokeCard extends Component<void, any, void> {

  static propTypes = {
    style: View.propTypes.style,
  };

  render() {
    return (
      <TouchableOpacity {...this.props} style={[ styles.card, this.props.style ]}>
        <Image
          style={styles.image}
          source={require('../../assets/jolteon.png')}
        />
        <View style={styles.details}>
          <Text style={styles.name}>
            Jolteon
          </Text>
          <View style={styles.item}>
            <Text style={styles.label}>
              Type
            </Text>
            <Text style={styles.summary}>
              Electric
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>
              Weakness
            </Text>
            <Text style={styles.summary}>
              Ground
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
