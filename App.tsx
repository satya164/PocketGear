import 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Home from './src/components/Home';

SplashScreen.preventAutoHideAsync();

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
  const ref = useNavigationContainerRef();

  React.useEffect(() => {
    Font.loadAsync({
      Montserrat: require('./assets/fonts/Montserrat.otf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
      ...MaterialIcons.font,
    }).then(() => setIsReady(true));
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer ref={ref} onReady={onLayoutRootView}>
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <Home />
      </View>
    </NavigationContainer>
  );
}
