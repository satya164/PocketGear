import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import Home from './src/components/Home';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Montserrat': require('./assets/fonts/Montserrat.otf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
      ...MaterialIcons.font,
    })
      .finally(() => setFontsLoaded(true))
      .catch(() => {});
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={() => SplashScreen.hideAsync()}>
      <StatusBar translucent />
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <Home />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusbar: {
    backgroundColor: '#fff',
  },
});
