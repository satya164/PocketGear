/* @flow */

import React, { PropTypes, Component } from 'react';
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
    backgroundColor: '#fff',
  },
});

type Props = {
  placeholder: string;
  value: string;
  onChangeSearch: Function;
  style?: any;
}

export default class SearchBar extends Component<void, Props, void> {

  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    style: AppbarShell.propTypes.style,
  };

  _handleClearPress = () => {
    this.props.onChangeSearch('');
  };

  render() {
    const {
      placeholder,
      value,
      style,
    } = this.props;

    return (
      <AppbarShell {...this.props} style={[ styles.container, style ]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          placeholderTextColor='rgba(0, 0, 0, .32)'
          underlineColorAndroid='transparent'
          onChangeText={this.props.onChangeSearch}
          returnKeyType='done'
        />
        <Icon
          style={[ styles.icon, styles.search ]}
          name='search'
          size={Platform.OS === 'ios' ? 16 : 24}
        />
        {this.props.value ?
          <TouchableOpacity onPress={this._handleClearPress} style={styles.touchable}>
            <Icon
              style={styles.icon}
              name='cancel'
              size={Platform.OS === 'ios' ? 16 : 24}
            />
          </TouchableOpacity> :
          null
        }
      </AppbarShell>
    );
  }
}
