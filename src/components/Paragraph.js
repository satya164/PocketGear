/* @flow */

import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  paragraph: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#222',
    lineHeight: 20,
    marginVertical: 4,
  },
});

type Props = {
  style?: any,
  children?: any,
};

export default function Paragraph(props: Props) {
  return (
    <Text {...props} style={[styles.paragraph, props.style]}>
      {props.children}
    </Text>
  );
}

Paragraph.defaultProps = {
  selectable: true,
};
