/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import data from '../data.json';
import sprites from '../sprites';

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

type Props = {
  index: number;
  style?: any;
}

export default class PokeCard extends Component<void, Props, void> {

  static propTypes = {
    index: PropTypes.number.isRequired,
    style: View.propTypes.style,
  };

  render() {
    const { index } = this.props;
    const item = data[index - 1];

    return (
      <TouchableOpacity {...this.props} style={[ styles.card, this.props.style ]}>
        <Image
          style={styles.image}
          source={sprites[item.index - 1]}
        />
        <View style={styles.details}>
          <Text style={styles.name}>
            {item.name}
          </Text>
          <View style={styles.item}>
            <Text style={styles.label}>
              Type
            </Text>
            <Text style={styles.summary}>
              {item.types.join(', ')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
