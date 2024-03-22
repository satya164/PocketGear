import 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Home from './src/components/Home';
import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusbar: {
    backgroundColor: '#fff',
  },
});

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const ref = useNavigationContainerRef();

  React.useEffect(() => {
    Font.loadAsync({
      'Montserrat': require('./assets/fonts/Montserrat.otf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
      ...MaterialIcons.font,
    }).then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer ref={ref}>
      <StatusBar translucent />
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <Home />
      </View>
    </NavigationContainer>
  );
}
