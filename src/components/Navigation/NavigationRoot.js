/* @flow */

import { PureComponent, PropTypes } from 'react';
import { AsyncStorage, Keyboard } from 'react-native';
import { v4 } from 'uuid';
import isEqual from 'lodash/isEqual';
import type { Route, NavigationState, NavigationAction } from './NavigationTypeDefinitions';

type Props = {
  persistenceKey: ?string;
  initialRoute: Route;
  renderNavigator: Function;
}

type State = {
  restoringState: boolean;
  navigation: NavigationState;
}

export default class NavigationRoot extends PureComponent<void, Props, State> {
  static propTypes = {
    renderNavigator: PropTypes.func.isRequired,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      restoringState: false,
      navigation: {
        index: 0,
        key: 'root',
        routes: [ { key: v4(), ...this.props.initialRoute } ],
      },
    };
  }

  state: State;

  componentWillMount() {
    this._restoreNavigationState();
  }

  _persistNavigationState = async (currentState: NavigationState) => {
    const { persistenceKey } = this.props;

    if (persistenceKey) {
      await AsyncStorage.setItem(persistenceKey, JSON.stringify(currentState));
    }
  };

  _restoreNavigationState = async () => {
    const { persistenceKey } = this.props;

    if (persistenceKey) {
      this.setState({
        restoringState: true,
      });

      const savedStateString = await AsyncStorage.getItem(persistenceKey);

      try {
        const savedState = JSON.parse(savedStateString);
        if (savedState) {
          this.setState({
            navigation: savedState,
          });
        }
      } catch (e) {
        // ignore
      }
    }

    this.setState({
      restoringState: false,
    });
  };

  _reduceState = (currentState: NavigationState, { type, route }: NavigationAction) => {
    const {
      index,
      routes,
    } = currentState;

    switch (type) {
    case 'push':
      if (route) {
        const lastRoute = routes[routes.length - 1];

        if (route.name === lastRoute.name) {
          if (route.props || lastRoute.props) {
            if (isEqual(route.props, lastRoute.props)) {
              return currentState;
            }
          } else {
            return currentState;
          }
        }

        return {
          ...currentState,
          routes: [
            ...routes,
            route,
          ],
          index: index + 1,
        };
      }
      return currentState;
    case 'pop':
      if (index > 0 && routes.length > 1) {
        return {
          ...currentState,
          routes: routes.slice(0, routes.length - 1),
          index: index - 1,
        };
      }
      return currentState;
    default:
      return currentState;
    }
  };

  _handleNavigate = ({ type, route }: NavigationAction) => {
    Keyboard.dismiss();

    const nextNavigationState = this._reduceState(this.state.navigation, {
      type,
      route: { key: v4(), ...route },
    });

    this.setState({
      navigation: nextNavigationState,
    });
    this._persistNavigationState(nextNavigationState);
  };

  render() {
    if (this.state.restoringState) {
      return null;
    }

    return this.props.renderNavigator({
      onNavigate: action => this._handleNavigate(action),
      navigationState: this.state.navigation,
    });
  }
}
