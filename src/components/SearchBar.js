/* @flow */

import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 2,
    margin: 8,
    height: 48,
    elevation: 2,
  },

  icon: {
    color: '#676767',
    margin: 12,
    height: 24,
    width: 24,
  },

  input: {
    fontFamily: 'Lato',
    flex: 1,
    margin: 0,
    padding: 0,
  }
});

export default class SearchBar extends Component {
  render() {
    const { ...rest, style } = this.props;

    return (
      <View style={[ styles.bar, style ]}>
        <Icon
          style={styles.icon}
          name='search'
          size={24}
        />
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          placeholderTextColor='#949494'
          underlineColorAndroid='transparent'
          {...rest}
        />
      </View>
    )
  }
}
