import { MaterialIcons } from '@expo/vector-icons';
import { DefaultTheme } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import MontserratSemiBold from './assets/fonts/Montserrat-SemiBold.otf';
import Montserrat from './assets/fonts/Montserrat.otf';
import Navigation from './src/components/Navigation';

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
  },
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Montserrat': Montserrat,
      'Montserrat-SemiBold': MontserratSemiBold,
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
      <Navigation
        theme={theme}
        onReady={() => SplashScreen.hideAsync()}
        linking={{
          prefixes: [Linking.createURL('/')],
          enabled: 'auto',
        }}
      />
    </>
  );
}
