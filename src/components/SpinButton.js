/* @flow */

import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TouchableButton from './TouchableButton';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#222',
  },

  input: {
    flex: 1,
    textAlign: 'center',
    height: 36,
    padding: 0,
    marginVertical: 0,
  },

  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
    borderRadius: 12,
  },

  spinbutton: {
    backgroundColor: 'rgba(0, 0, 0, .06)',
    borderRadius: 24,
    paddingHorizontal: 8,
  },

  icon: {
    color: '#222',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

type Props = {
  value: number,
  onChange?: Function,
  onChangeValue: (value: number) => void,
  style?: any,
};

export default class SpinButton extends PureComponent<Props, void> {
  _handleChangeText = (text: string) => {
    this.props.onChangeValue(parseInt(text, 10));
  };

  _handleIncrement = () => {
    this.props.onChangeValue(this.props.value + 1);
  };

  _handleDecrement = () => {
    this.props.onChangeValue(this.props.value - 1);
  };

  render() {
    const { value, onChange, ...rest } = this.props;

    return (
      <View {...rest} style={[styles.spinbutton, styles.row, this.props.style]}>
        <TouchableButton onPress={this._handleDecrement} style={styles.button}>
          <MaterialIcons name="remove" size={16} style={styles.icon} />
        </TouchableButton>
        <TextInput
          selectTextOnFocus
          keyboardType="numeric"
          returnKeyType="done"
          value={isNaN(value) ? '' : value.toString()}
          onChange={onChange}
          onChangeText={this._handleChangeText}
          underlineColorAndroid="transparent"
          selectionColor="rgba(0, 0, 0, .32)"
          style={[styles.text, styles.input]}
        />
        <TouchableButton onPress={this._handleIncrement} style={styles.button}>
          <MaterialIcons name="add" size={16} style={styles.icon} />
        </TouchableButton>
      </View>
    );
  }
}
