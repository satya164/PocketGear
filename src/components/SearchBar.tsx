import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputFocusEventData,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const LOLLIPOP = 21;

const SearchBar = <T extends Toggle>({
  onChangeText,
  onFocus: onCustomFocus,
  onBlur: onCustomBlur,
  placeholder,
  value,
  style,
  toggles,
  onChangeToggle,
}: Props<T>) => {
  const insets = useSafeAreaInsets();
  const [togglesVisible, setTogglesVisible] = useState(false);
  const focused = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (togglesVisible) {
      Animated.spring(focused, {
        toValue: 1,
        tension: 300,
        friction: 35,
        useNativeDriver: true,
      }).start();
    }
  }, [focused, togglesVisible]);

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onCustomFocus?.(e);
    setTogglesVisible(true);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onCustomBlur?.(e);

    Animated.spring(focused, {
      toValue: 0,
      tension: 300,
      friction: 35,
      useNativeDriver: true,
    }).start(() => setTogglesVisible(false));
  };

  const onClearPress = () => {
    onChangeText('');
  };

  const radius = focused.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 0],
  });

  const bar = Platform.OS === 'android' && {
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
    >
      {Platform.OS === 'ios' ? (
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
      ) : null}
      <Animated.View style={[styles.bar, bar]}>
        <TextInput
          ref={inputRef}
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
        <TouchableOpacity
          onPress={() => inputRef.current?.blur()}
          style={[styles.touchable, styles.search]}
        >
          <MaterialIcons style={styles.icon} name="search" size={20} />
        </TouchableOpacity>
        {value ? (
          <TouchableOpacity
            onPress={onClearPress}
            style={[styles.touchable, styles.clear]}
          >
            <MaterialIcons style={styles.icon} name="cancel" size={16} />
          </TouchableOpacity>
        ) : null}
      </Animated.View>
      <Animated.View
        style={[
          styles.bar,
          styles.toggles,
          { display: togglesVisible ? 'flex' : 'none', opacity: focused },
        ]}
        pointerEvents={togglesVisible ? 'auto' : 'none'}
      >
        <View style={styles.separator} />
        <View style={styles.row}>
          {toggles.map((toggle) => (
            <FilterToggle
              key={toggle.name}
              active={toggle.active}
              label={toggle.label}
              onPress={() => onChangeToggle(toggle)}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Platform.OS === 'ios' ? 0 : 8,
    marginTop: Platform.OS === 'ios' ? 0 : 8,
    marginBottom: 0,
  },

  bar: {
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
    ...Platform.select({
      ios: null,
      default: {
        backgroundColor: '#fff',
        borderRadius: 2,
      },
    }),
  },

  icon: {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, .32)',
    margin: 14,
  },

  touchable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },

  search: {
    left: Platform.select({
      ios: 4,
      default: 0,
    }),
  },

  clear: {
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
    height: Platform.select({
      ios: 44,
      default: 48,
    }),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },

  toggles: {
    borderRadius: 0,
    ...Platform.select({
      ios: {
        marginTop: -8,
      },
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
        paddingLeft: 36,
        borderRadius: 5,
        backgroundColor: '#eeeeef',
        margin: 8,
        height: 36,
      },
      web: {
        paddingLeft: 48,
        // `height` doesn't work on web
        lineHeight: 48,
      },
      default: {
        paddingLeft: 48,
        height: 48,
      },
    }),
  },
});

export default SearchBar;
