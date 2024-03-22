import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';

type Props = {
  source: ImageSourcePropType;
  label: string;
};

function NoResults({ source, label }: Props) {
  return (
    <View style={styles.container}>
      <Image style={styles.item} source={source} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },

  item: {
    margin: 8,
    alignItems: 'center',
  },

  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: '#222',
    opacity: 0.5,
    margin: 8,
  },
});

export default NoResults;
