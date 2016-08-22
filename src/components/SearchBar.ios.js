/* @flow */

import React, { PropTypes, Component } from 'react';
import SearchBarIOS from 'react-native-search-bar';

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

  render() {
    const {
      placeholder,
      value,
    } = this.props;

    return (
      <SearchBarIOS
        hideBackground
        showsCancelButton={true}
        placeholder={placeholder}
        text={value}
        onChangeText={this.props.onChangeSearch}
      />
    );
  }
}
