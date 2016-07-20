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
    height: 56,
    elevation: 2,
  },

  icon: {
    color: '#676767',
    margin: 16,
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

export default class SearchBar extends Component<void, any, void> {

  static propTypes = {
    style: View.propTypes.style,
  };

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
          placeholderTextColor='#949494'
          underlineColorAndroid='transparent'
          {...rest}
        />
      </View>
    );
  }
}
