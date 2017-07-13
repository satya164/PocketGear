/* @flow */

import React, { PureComponent } from 'react';
import {
  Platform,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppbarShell from './AppbarShell';

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'ios' ? 8 : 0,
  },

  icon: {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, .32)',
    margin: Platform.OS === 'ios' ? 14 : 16,
  },

  search: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  touchable: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  input: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#000',
    flex: 1,
    margin: 0,
    paddingVertical: 0,
    paddingHorizontal: Platform.OS === 'ios' ? 32 : 56,
    paddingRight: 8,
    borderRadius: 5,
    backgroundColor: Platform.OS === 'ios' ? '#f0f0f0' : '#fff',
  },
});

type Props = {
  onChangeText: Function,
  onFocus?: Function,
  onBlur?: Function,
  placeholder: string,
  value: string,
  style?: any,
};

export default class SearchBar extends PureComponent<void, Props, void> {
  _handleClearPress = () => {
    this.props.onChangeText('');
  };

  render() {
    const {
      onChangeText,
      onFocus,
      onBlur,
      placeholder,
      value,
      style,
      ...rest
    } = this.props;

    return (
      <AppbarShell {...rest} style={[styles.container, style]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          placeholderTextColor="rgba(0, 0, 0, .32)"
          underlineColorAndroid="transparent"
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType="done"
        />
        <Icon
          style={[styles.icon, styles.search]}
          name="search"
          size={Platform.OS === 'ios' ? 16 : 24}
        />
        {this.props.value
          ? <TouchableOpacity
              onPress={this._handleClearPress}
              style={styles.touchable}
            >
              <Icon
                style={styles.icon}
                name="cancel"
                size={Platform.OS === 'ios' ? 16 : 24}
              />
            </TouchableOpacity>
          : null}
      </AppbarShell>
    );
  }
}
