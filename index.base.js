/* @flow */

import { AppRegistry } from 'react-native';
import Realm from 'realm';
import Home from './src/components/Home';

import fill from './src/fill';

fill();

AppRegistry.registerComponent('pokematch', () => Home);
