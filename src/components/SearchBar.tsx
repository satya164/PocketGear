import React, { PureComponent } from 'react';
import {
  Animated,
  Keyboard,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FilterToggle from './FilterToggle';

type Toggle = {
  name: string;
  active: boolean;
  label: string;
};

type Props<T extends Toggle> = {
  onChangeText: (query: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder: string;
  value: string;
  toggles: T[];
  onChangeToggle: (toggle: T) => void;
  style?: StyleProp<ViewStyle>;
};

type State = {
  toggles: boolean;
  focused: Animated.Value;
};

const LOLLIPOP = 21;

export default class SearchBar<T extends Toggle> extends PureComponent<
  Props<T>,
  State
> {
  static HEIGHT = Platform.OS === 'ios' ? 64 : 56;

  state = {
    toggles: false,
    focused: new Animated.Value(0),
  };

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this._handleFocus);
    Keyboard.addListener('keyboardDidHide', this._handleBlur);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this._handleFocus);
    Keyboard.removeListener('keyboardDidHide', this._handleBlur);
  }

  _handleClearPress = () => {
    this.props.onChangeText('');
  };

  _handleFocus = () =>
    Animated.spring(this.state.focused, {
      toValue: 1,
      tension: 300,
      friction: 35,
    }).start(() => this.setState({ toggles: true }));

  _handleBlur = () =>
    Animated.spring(this.state.focused, {
      toValue: 0,
      tension: 300,
      friction: 35,
    }).start(() => this.setState({ toggles: false }));

  render() {
    const {
      onChangeText,
      onFocus,
      onBlur,
      placeholder,
      value,
      style,
      ...rest
    } = this.props;

    const radius = this.state.focused.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 0],
    });

    const bar = Platform.OS === 'android' && {
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
    };

    return (
      <View {...rest} style={[styles.container, style]}>
        <Animated.View style={[styles.bar, bar]}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            placeholderTextColor="rgba(0, 0, 0, .32)"
            selectionColor="rgba(0, 0, 0, .32)"
            underlineColorAndroid="transparent"
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            returnKeyType="done"
          />
          <MaterialIcons
            style={[styles.icon, styles.search]}
            name="search"
            size={Platform.OS === 'ios' ? 16 : 24}
          />
          {this.props.value ? (
            <TouchableOpacity
              onPress={this._handleClearPress}
              style={styles.touchable}
            >
              <MaterialIcons
                style={styles.icon}
                name="cancel"
                size={Platform.OS === 'ios' ? 16 : 24}
              />
            </TouchableOpacity>
          ) : null}
        </Animated.View>
        <Animated.View
          style={[styles.bar, styles.toggles, { opacity: this.state.focused }]}
          pointerEvents={this.state.toggles ? 'auto' : 'none'}
        >
          <Animated.View style={styles.separator} />
          <Animated.View style={styles.row}>
            {this.props.toggles.map(toggle => (
              <FilterToggle
                key={toggle.name}
                active={toggle.active}
                label={toggle.label}
                onPress={() => this.props.onChangeToggle(toggle)}
              />
            ))}
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Platform.OS === 'ios' ? 0 : 8,
    marginTop: Platform.OS === 'ios' ? 20 : 8,
    marginBottom: 0,
  },

  bar: {
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
      width: 0,
    },
    borderColor: 'rgba(0, 0, 0, 0.16)',
    borderWidth:
      Platform.OS === 'android' && Platform.Version < LOLLIPOP
        ? StyleSheet.hairlineWidth
        : 0,
    borderRadius: Platform.OS === 'ios' ? 0 : 2,
  },

  icon: {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, .32)',
    margin: 14,
  },

  search: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  touchable: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    height:
      Platform.OS === 'android' && Platform.Version >= LOLLIPOP
        ? StyleSheet.hairlineWidth
        : 0,
  },

  row: {
    height: Platform.OS === 'ios' ? 44 : 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },

  toggles: {
    borderRadius: 0,
    ...Platform.select({
      ios: null,
      default: {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
      },
    }),
  },

  input: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#000',
    flex: 1,
    margin: 0,
    paddingVertical: 0,
    paddingRight: 8,
    ...Platform.select({
      ios: {
        paddingLeft: 28,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        margin: 8,
        height: 28,
      },
      default: {
        paddingLeft: 48,
        height: 48,
      },
    }),
  },
});
