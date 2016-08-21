/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppbarShell from './AppbarShell';

const styles = StyleSheet.create({
  icon: {
    color: 'rgba(0, 0, 0, .32)',
    margin: 16,
    height: 24,
    width: 24,
  },

  input: {
    fontFamily: 'Montserrat',
    color: '#000',
    flex: 1,
    margin: 0,
    padding: 0,
  },
});

type Props = {
  placeholder: string;
  value: string;
  onChangeSearch: Function;
}

export default class SearchBar extends Component<void, Props, void> {

  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
  };

  _handleClearPress = () => {
    this.props.onChangeSearch('');
  };

  render() {
    const {
      placeholder,
      value,
    } = this.props;

    return (
      <AppbarShell {...this.props}>
        <Icon
          style={styles.icon}
          name='search'
          size={24}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          placeholderTextColor='rgba(0, 0, 0, .32)'
          underlineColorAndroid='transparent'
          onChangeText={this.props.onChangeSearch}
        />
        {this.props.value ?
          <TouchableOpacity onPress={this._handleClearPress}>
            <Icon
              style={styles.icon}
              name='close'
              size={24}
            />
          </TouchableOpacity> :
          null
        }
      </AppbarShell>
    );
  }
}
