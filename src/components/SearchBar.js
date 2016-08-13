/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  Platform,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LOLLIPOP = 21;

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 56,
    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    borderBottomWidth: Platform.Version && Platform.Version >= LOLLIPOP ? 0 : StyleSheet.hairlineWidth,
    elevation: 2,
  },

  icon: {
    color: '#676767',
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
      <View style={styles.bar}>
        <Icon
          style={styles.icon}
          name='search'
          size={24}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          placeholderTextColor='#949494'
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
      </View>
    );
  }
}
