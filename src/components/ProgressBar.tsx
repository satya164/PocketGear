import React, { PureComponent } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type Props = {
  ratio: number;
  fillColor?: string;
  style?: StyleProp<ViewStyle>;
};

export default class ProgressBar extends PureComponent<Props> {
  static defaultProps = {
    fillColor: '#FB6B6F',
  };

  render() {
    const { fillColor, ratio, style } = this.props;

    return (
      <View style={[styles.bar, styles.round, style]}>
        <View
          style={[{ flex: ratio, backgroundColor: fillColor }, styles.round]}
        />
        <View style={{ flex: 1 - ratio }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: 'row',
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, .06)',
  },

  round: {
    borderRadius: 2,
  },
});
