import * as React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

export default function Paragraph({
  selectable = true,
  style,
  children,
  ...rest
}: TextProps) {
  return (
    <Text {...rest} selectable={selectable} style={[styles.paragraph, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#222',
    lineHeight: 20,
    marginVertical: 4,
  },
});
