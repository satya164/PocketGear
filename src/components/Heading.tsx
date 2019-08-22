import * as React from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type Props = React.ComponentProps<typeof Text> & {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export default function Heading(props: Props) {
  return (
    <Text {...props} style={[styles.heading, props.style]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: '#222',
    lineHeight: 23,
    marginVertical: 4,
  },
});
