import { MaterialIcons } from '@expo/vector-icons';
import { PlatformPressable } from '@react-navigation/elements';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type Props = Partial<React.ComponentProps<typeof PlatformPressable>> & {
  style?: StyleProp<ViewStyle>;
};

export default function More(props: Props) {
  return (
    <PlatformPressable
      {...props}
      style={[styles.card, styles.center, props.style]}
    >
      <View style={styles.center}>
        <View style={styles.button}>
          <MaterialIcons name="arrow-forward" size={16} style={styles.icon} />
        </View>
        <Text style={styles.more}>more</Text>
      </View>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 167,
    borderRadius: 2,
    backgroundColor: '#f0f0f0',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#222',
  },

  more: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 9,
    color: '#222',
    marginVertical: 4,
  },
});
