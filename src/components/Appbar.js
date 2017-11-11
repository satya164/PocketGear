/* @flow */

import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TouchableItem from './TouchableItem';
import AppbarShell from './AppbarShell';

const styles = StyleSheet.create({
  icon: {
    color: '#222',
  },

  button: {
    height: AppbarShell.HEIGHT,
    width: AppbarShell.HEIGHT - 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#222',
    fontFamily: 'Montserrat',
    fontSize: Platform.OS === 'ios' ? 16 : 18,
  },

  content: {
    flex: 1,
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});

type Props = {
  style?: any,
  children?: any,
  navigation: Object,
};

export default class Appbar extends PureComponent<Props, void> {
  _handleGoBack = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <AppbarShell {...this.props}>
        <TouchableItem
          borderless
          style={styles.button}
          onPress={this._handleGoBack}
        >
          {Platform.OS === 'ios' ? (
            <EvilIcons name="chevron-left" size={36} style={styles.icon} />
          ) : (
            <MaterialIcons name="arrow-back" size={24} style={styles.icon} />
          )}
        </TouchableItem>
        <View style={styles.content}>
          {typeof this.props.children === 'string' ? (
            <Text numberOfLines={1} style={styles.title}>
              {this.props.children}
            </Text>
          ) : (
            this.props.children
          )}
        </View>
        <View style={styles.button} />
      </AppbarShell>
    );
  }
}
