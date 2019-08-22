import React, { PureComponent } from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  onPress: (e: GestureResponderEvent) => void;
  children: React.ReactNode;
};

export default class TouchableButton extends PureComponent<Props> {
  componentWillUnmount() {
    this._cleanUp();
  }

  _interval: any;
  _timeout: any;
  _handled: boolean = false;

  _cleanUp = () => {
    if (this._interval) {
      clearInterval(this._interval);
    }
    if (this._timeout) {
      clearInterval(this._timeout);
    }
    this._handled = false;
  };

  _handlePressIn = (e: any) => {
    this._timeout = setTimeout(() => {
      this._interval = setInterval(() => {
        this._handled = true;
        this.props.onPress(e);
      }, 50);
    }, 750);
  };

  _handlePressOut = () => {
    this._cleanUp();
  };

  _handlePress = (e: any) => {
    if (this._handled) {
      return;
    }
    this.props.onPress(e);
  };

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        onPress={this._handlePress}
        onPressIn={this._handlePressIn}
        onPressOut={this._handlePressOut}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
