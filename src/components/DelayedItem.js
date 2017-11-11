/* @flow */

import React, { PureComponent } from 'react';
import { StyleSheet, InteractionManager } from 'react-native';
import Placeholder from './Placeholder';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props<T> = T & {
  component: React.ComponentType<T>,
};

type State = {
  loading: boolean,
};

export default class StrongAgainstList<T: *> extends PureComponent<
  Props<T>,
  State
> {
  state: State = {
    loading: true,
  };

  componentWillMount() {
    InteractionManager.runAfterInteractions(this._setLoading);
  }

  _setLoading = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    if (this.state.loading) {
      return <Placeholder style={styles.container} />;
    } else {
      const { component: ItemComponent, ...rest } = this.props;
      return <ItemComponent {...rest} />;
    }
  }
}
