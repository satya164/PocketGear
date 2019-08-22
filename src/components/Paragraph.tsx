import * as React from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
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

const styles = StyleSheet.create({
  paragraph: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#222',
    lineHeight: 20,
    marginVertical: 4,
  },
});
