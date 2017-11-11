/* @flow */

import React, { PureComponent } from 'react';
import { View, Platform, StatusBar, StyleSheet } from 'react-native';
import Expo from 'expo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

type State = {
  bootstrapped: boolean,
};

export default class App extends PureComponent<{}, State> {
  state: State = {
    bootstrapped: false,
  };

  componentWillMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    await Expo.Font.loadAsync({
      /* $FlowFixMe */
      Montserrat: require('./assets/fonts/Montserrat.otf'),
      /* $FlowFixMe */
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
      ...MaterialIcons.font,
    });

    global.requestAnimationFrame(() => {
      this.setState({ bootstrapped: true });
    });
  };

  render() {
    if (!this.state.bootstrapped) {
      return <Expo.AppLoading />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <Home />
      </View>
    );
  }
}
