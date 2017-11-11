/* @flow */

import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: '#222',
    lineHeight: 23,
    marginVertical: 4,
  },
});

type Props = {
  style?: any,
  children?: any,
};

export default function Heading(props: Props) {
  return (
    <Text {...props} style={[styles.heading, props.style]}>
      {props.children}
    </Text>
  );
}
