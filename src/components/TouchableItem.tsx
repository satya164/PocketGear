import React, { PureComponent } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Props = React.ComponentProps<typeof TouchableWithoutFeedback> & {
  delayPressIn: number;
  pressColor: string;
  activeOpacity?: number;
  borderless?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const LOLLIPOP = 21;

export default class TouchableItem extends PureComponent<Props> {
  static defaultProps = {
    delayPressIn: 0,
    pressColor: 'rgba(0, 0, 0, .16)',
  };

  render() {
    if (Platform.OS === 'android' && Platform.Version >= LOLLIPOP) {
      return (
        <TouchableNativeFeedback
          {...this.props}
          style={null}
          background={TouchableNativeFeedback.Ripple(
            this.props.pressColor,
            this.props.borderless
          )}
        >
          <View style={this.props.style}>{this.props.children}</View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity {...this.props}>
          {this.props.children}
        </TouchableOpacity>
      );
    }
  }
}
