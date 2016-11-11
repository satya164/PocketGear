/* @flow */
/* eslint-disable no-undefined */

import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  NavigationExperimental,
} from 'react-native';
import type { Route } from './NavigationTypeDefinitions';

const {
  Card: NavigationCard,
} = NavigationExperimental;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

type Props = {
  scene: {
    index: number;
    route: Route;
  };
  routeMapper: Function;
  onNavigate: Function;
  onNavigateBack: Function;
  style?: any;
}

export type RouteDescription = {
  title?: string;
  titleComponent?: ReactClass<any>;
  leftComponent?: ReactClass<any>;
  rightComponent?: ReactClass<any>;
  component: ReactClass<any>;
}

export default class Scene extends PureComponent<void, Props, void> {
  static propTypes = {
    scene: PropTypes.shape({
      index: PropTypes.number.isRequired,
      route: PropTypes.object.isRequired,
    }).isRequired,
    onNavigate: PropTypes.func.isRequired,
    onNavigateBack: PropTypes.func.isRequired,
    routeMapper: PropTypes.func.isRequired,
    style: View.propTypes.style,
  }

  _renderScene = () => {
    const {
      route,
    } = this.props.scene;

    const routeDesc = this.props.routeMapper(route);
    const SceneChild = routeDesc.component;

    return (
      <View style={[ styles.container, this.props.style ]}>
        <SceneChild
          {...route.props}
          style={styles.content}
          onNavigate={this.props.onNavigate}
        />
      </View>
    );
  };

  render() {
    const {
      route,
    } = this.props.scene;

    const routeDesc = this.props.routeMapper(route);

    return (
      <NavigationCard
        {...this.props}
        style={routeDesc.type === 'modal' ?
          NavigationCard.CardStackStyleInterpolator.forVertical(this.props) :
          undefined
        }
        panHandlers={null}
        renderScene={this._renderScene}
        onNavigateBack={this.props.onNavigateBack}
      />
    );
  }
}
