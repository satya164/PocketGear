/* @flow */

import { Font, Components } from 'exponent';
import { MaterialIcons } from '@exponent/vector-icons';
import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import NavigationRoot from './Navigation/NavigationRoot';
import NavigationScene from './Navigation/NavigationScene';
import NavigationView from './Navigation/NavigationView';
import routeMapper from './Navigation/routeMapper';

const PERSISTANCE_KEY = process.env.NODE_ENV !== 'production' ? 'FLAT_PERSISTENCE_0' : null;

export default class Home extends Component<void, void, void> {

  state = {
    bootstrapped: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      Montserrat: require('../../assets/fonts/Montserrat.otf'),
      MontserratBold: require('../../assets/fonts/Montserrat_bold.otf'),
      ...MaterialIcons.font,
    });

    requestAnimationFrame(() => {
      this.setState({bootstrapped: true});
    });
  }

  render() {
    if (!this.state.bootstrapped) {
      return <Components.AppLoading />
    }

    return (
      <View style={{flex: 1}}>
        <NavigationRoot
          initialRoute={{ name: 'home' }}
          persistenceKey={PERSISTANCE_KEY}
          renderNavigator={this._renderNavigator}
        />

        <StatusBar
          barStyle={Platform.OS === 'android' ? 'light-content' : 'default'}
          backgroundColor="#000"
          translucent
        />
      </View>
    );
  }

  _renderScene = (props: any) => {
    return (
      <NavigationScene
        {...props}
        key={props.scene.key}
        routeMapper={routeMapper}
      />
    );
  };

  _renderNavigator = (props: any) => {
    return (
      <NavigationView
        {...props}
        renderScene={this._renderScene}
      />
    );
  };
}
