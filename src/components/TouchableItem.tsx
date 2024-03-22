import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type Props = React.ComponentProps<typeof TouchableWithoutFeedback> & {
  delayPressIn?: number;
  pressColor?: string;
  activeOpacity?: number;
  borderless?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const LOLLIPOP = 21;

function TouchableItem({
  delayPressIn = 0,
  pressColor = 'rgba(0, 0, 0, .16)',
  borderless = false,
  style,
  children,
  ...rest
}: Props) {
  if (Platform.OS === 'android' && Platform.Version >= LOLLIPOP) {
    return (
      <TouchableNativeFeedback
        {...rest}
        delayPressIn={delayPressIn}
        style={null}
        background={TouchableNativeFeedback.Ripple(pressColor, borderless)}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity delayPressIn={delayPressIn} style={style} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }
}

export default TouchableItem;
