import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { MaterialIcons, EvilIcons } from '@expo/vector-icons';
import TouchableItem from './TouchableItem';
import AppbarShell from './AppbarShell';
import { useNavigation } from '@react-navigation/native';

type Props = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

function Appbar({ children, ...rest }: Props) {
  const navigation = useNavigation();

  return (
    <AppbarShell {...rest}>
      <TouchableItem
        borderless
        style={styles.button}
        onPress={navigation.goBack}
      >
        {Platform.OS === 'ios' ? (
          <EvilIcons name="chevron-left" size={36} style={styles.icon} />
        ) : (
          <MaterialIcons name="arrow-back" size={24} style={styles.icon} />
        )}
      </TouchableItem>
      <View style={styles.content}>
        {typeof children === 'string' ? (
          <Text numberOfLines={1} style={styles.title}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      <View style={styles.button} />
    </AppbarShell>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: '#222',
  },

  button: {
    height: '100%',
    aspectRatio: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#222',
    fontFamily: 'Montserrat',
    fontSize: Platform.OS === 'ios' ? 16 : 18,
  },

  content: {
    flex: 1,
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});

export default Appbar;
