/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },

  cover: {
    backgroundColor: '#1d2c47',
    alignItems: 'center',
    padding: 16,
    height: null,
    width: null,
  },

  appbar: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  button: {
    padding: 12,
  },

  icon: {
    color: '#fff',
  },

  image: {
    margin: 16,
    height: 96,
    resizeMode: 'contain',
  },

  name: {
    fontFamily: 'Lato',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  details: {
    padding: 8,
  },

  row: {
    flexDirection: 'row',
    margin: 8,
  },

  block: {
    margin: 8,
  },

  title: {
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  summary: {
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 21,
    color: '#333',
  },

  label: {
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    width: 80,
  },

  text: {
    fontFamily: 'Lato',
    fontSize: 14,
    color: '#333',
  },
});

type Props = {
  onNavigate: Function;
  style?: any;
}

export default class PokeCard extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    style: ScrollView.propTypes.style,
  };

  _handleGoBack = () => {
    this.props.onNavigate({ type: 'pop' });
  };

  render() {
    return (
      <ScrollView {...this.props} style={[ styles.container, this.props.style ]}>
        <StatusBar backgroundColor='#182438' />
        <Image source={require('../../assets/cover.png')} style={styles.cover}>
          <View style={styles.appbar}>
            <TouchableOpacity style={styles.button} onPress={this._handleGoBack}>
              <Icon
                name='arrow-back'
                size={24}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <Image
            style={styles.image}
            source={require('../../assets/jolteon.png')}
          />
          <Text style={styles.name}>
            Jolteon
          </Text>
        </Image>
        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Pokédex
            </Text>
            <Text style={styles.text}>
              #135
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              Type
            </Text>
            <Text style={styles.text}>
              Electric
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.title}>
              Lightning Pokémon
            </Text>
            <Text style={styles.summary}>
              Jolteon's cells generate a low level of electricity. This power is amplified by the static electricity of its fur, enabling the Pokémon to drop thunderbolts. The bristling fur is made of electrically charged needles.
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.title}>
              Evolution
            </Text>
            <Text style={styles.summary}>
              Evee → Jolteon
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
