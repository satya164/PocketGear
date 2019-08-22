import React from 'react';
import { View, Platform, StatusBar, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/core';
import { useBackButton } from '@react-navigation/native';
import Home from './src/components/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusbar: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
});

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const ref = React.useRef();

  useBackButton(ref);

  React.useEffect(() => {
    Font.loadAsync({
      Montserrat: require('./assets/fonts/Montserrat.otf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
      ...MaterialIcons.font,
    }).then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer ref={ref}>
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <Home />
      </View>
    </NavigationContainer>
  );
}
