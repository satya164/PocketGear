/* @flow */

import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import type { NavigationState } from './NavigationTypeDefinitions';

const {
  NavigationExperimental,
  BackAndroid,
  StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const {
  Transitioner: NavigationTransitioner,
} = NavigationExperimental;

type Props = {
  navigationState: NavigationState;
  onNavigate: Function;
  renderScene: Function;
  style?: any;
}

export default class NavigationView extends Component<void, Props, void> {
  static propTypes = {
    navigationState: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
    renderScene: PropTypes.func.isRequired,
    style: PropTypes.any,
  };

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  _handleNavigateBack = () => {
    this.props.onNavigate({
      type: 'pop',
    });
  };

  _handleBackPress = () => {
    const {
      navigationState,
    } = this.props;

    if (navigationState && navigationState.routes && navigationState.routes.length > 1) {
      this._handleNavigateBack();
      return true;
    }

    return false;
  };

  _render = (transitionProps: any): Array<React.Element<any>> => {
    return transitionProps.scenes.map(scene => {
      const sceneProps = {
        ...transitionProps,
        scene,
        key: scene.route.key,
        onNavigate: this.props.onNavigate,
        onNavigateBack: this._handleNavigateBack,
      };
      return this.props.renderScene(sceneProps);
    });
  };

  render() {
    return (
      <NavigationTransitioner
        {...this.props}
        render={this._render}
        style={[ styles.container, this.props.style ]}
      />
    );
  }
}
