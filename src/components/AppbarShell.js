/* @flow */

import React, { PureComponent } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const LOLLIPOP = 21;

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: BAR_HEIGHT,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    borderBottomWidth:
      Platform.OS === 'android' && Platform.Version < LOLLIPOP
        ? StyleSheet.hairlineWidth
        : 0,
    zIndex: 1,
  },
});

type Props = {
  style?: any,
  children?: any,
};

export default class AppbarShell extends PureComponent<Props, void> {
  static HEIGHT = BAR_HEIGHT;

  render() {
    return (
      <View {...this.props} style={[styles.appbar, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}
