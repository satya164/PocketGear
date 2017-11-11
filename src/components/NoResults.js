/* @flow */

import React, { PureComponent } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },

  item: {
    margin: 8,
    alignItems: 'center',
  },

  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: '#222',
    opacity: 0.5,
    margin: 8,
  },
});

type Props = {
  source: any,
  label: string,
};

export default class NoResults extends PureComponent<Props, void> {
  render() {
    const { source, label } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.item} source={source} />
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }
}
