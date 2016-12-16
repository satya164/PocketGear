/* @flow */

import React, { PureComponent, PropTypes } from 'react';
import ReactNative from 'react-native';
import type { NavigationState } from './NavigationTypeDefinitions';

const {
  Animated,
  BackAndroid,
  NavigationExperimental,
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

export default class NavigationView extends PureComponent<void, Props, void> {
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

  _configureTransition = (transitionProps: any, previousTransitionProps: any) => {
    let speed = 15;
    let restSpeedThreshold = 0.001;
    let restDisplacementThreshold = 0.001;

    // Popping should be faster than pushing
    if (previousTransitionProps.navigationState.index >= transitionProps.navigationState.index) {
      speed = 30;
      restSpeedThreshold = 0.2;
      restDisplacementThreshold = 0.15;
    }

    return {
      timing: Animated.spring,
      bounciness: 0,
      speed,
      restSpeedThreshold,
      restDisplacementThreshold,
      useNativeDriver: true,
    };
  }

  render() {
    return (
      <NavigationTransitioner
        {...this.props}
        render={this._render}
        style={[ styles.container, this.props.style ]}
        configureTransition={this._configureTransition}
      />
    );
  }
}
