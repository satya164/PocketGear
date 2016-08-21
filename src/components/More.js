/* @flow */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#e7e7e7',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth * 3,
    borderColor: 'rgba(0, 0, 0, .5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: 'rgba(0, 0, 0, .5)',
  },

  more: {
    fontFamily: 'Montserrat',
    fontSize: 9,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .5)',
    marginVertical: 4,
  },
});

type Props = {
  style?: any;
}

export default function More(props: Props) {
  return (
    <TouchableOpacity {...props} style={[ styles.card, styles.center, props.style ]}>
      <View style={styles.center}>
        <View style={styles.button}>
          <MaterialIcons
            name='arrow-forward'
            size={16}
            style={styles.icon}
          />
        </View>
        <Text style={styles.more}>more</Text>
      </View>
    </TouchableOpacity>
  );
}
