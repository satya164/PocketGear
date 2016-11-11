/* @flow */

import React, { PureComponent } from 'react';
import NavigationRoot from './Navigation/NavigationRoot';
import NavigationScene from './Navigation/NavigationScene';
import NavigationView from './Navigation/NavigationView';
import routeMapper from './Navigation/routeMapper';

const PERSISTANCE_KEY = process.env.NODE_ENV !== 'production' ? 'FLAT_PERSISTENCE_0' : null;

export default class Home extends PureComponent<void, *, void> {
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

  render() {
    return (
      <NavigationRoot
        initialRoute={{ name: 'home' }}
        persistenceKey={PERSISTANCE_KEY}
        renderNavigator={this._renderNavigator}
      />
    );
  }
}
