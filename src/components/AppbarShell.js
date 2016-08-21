/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

const BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const LOLLIPOP = 21;

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: BAR_HEIGHT,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#fff',
    elevation: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    borderBottomWidth: Platform.OS === 'android' && Platform.Version >= LOLLIPOP ? 0 : StyleSheet.hairlineWidth,
  },
});

type Props = {
  style?: any;
  children?: any;
}

export default class AppbarShell extends Component<void, Props, void> {

  static propTypes = {
    children: PropTypes.node.isRequired,
    style: View.propTypes.style,
  };

  static HEIGHT = BAR_HEIGHT;

  render() {
    return (
      <View {...this.props} style={[ styles.appbar, this.props.style ]}>
        {this.props.children}
      </View>
    );
  }
}
