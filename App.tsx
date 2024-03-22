import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import Navigation from './src/components/Navigation';

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
    <>
      <StatusBar translucent />
      <Navigation onReady={() => SplashScreen.hideAsync()} />
    </>
  );
}
