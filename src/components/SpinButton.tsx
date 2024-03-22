import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputChangeEventData,
  type ViewStyle,
} from 'react-native';
import TouchableButton from './TouchableButton';

type Props = {
  value: number;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onValueChange: (value: number) => void;
  style?: StyleProp<ViewStyle>;
};

function SpinButton({
  value,
  onChange,
  onValueChange,
  onIncrement,
  onDecrement,
  style,
  ...rest
}: Props) {
  const onChangeText = (text: string) => {
    onValueChange(parseInt(text, 10));
  };

  return (
    <View {...rest} style={[styles.spinbutton, styles.row, style]}>
      <TouchableButton onPress={onDecrement} style={styles.button}>
        <MaterialIcons name="remove" size={16} style={styles.icon} />
      </TouchableButton>
      <TextInput
        selectTextOnFocus
        keyboardType="numeric"
        returnKeyType="done"
        value={isNaN(value) ? '' : value.toString()}
        onChange={onChange}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        selectionColor="rgba(0, 0, 0, .32)"
        style={[styles.text, styles.input]}
      />
      <TouchableButton onPress={onIncrement} style={styles.button}>
        <MaterialIcons name="add" size={16} style={styles.icon} />
      </TouchableButton>
    </View>
  );
}

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
    // Workaround for Web
    width: 56,
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

export default SpinButton;
