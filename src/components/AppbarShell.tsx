import React from 'react';
import { Platform, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { getDefaultHeaderHeight } from '@react-navigation/elements';

type Props = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const LOLLIPOP = 21;

function AppbarShell({ style, children }: Props) {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.appbar,
        {
          height: getDefaultHeaderHeight(frame, false, insets.top),
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
      width: 0,
    },
    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    borderBottomWidth:
      Platform.OS === 'android' && Platform.Version < LOLLIPOP
        ? StyleSheet.hairlineWidth
        : 0,
    zIndex: 1,
  },
});

export default AppbarShell;
