import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, ScrollView } from 'react-native';
import GridView from './GridView';
import PokemonListCard from './PokemonListCard';
import { Pokemon } from '../types';

type Props = React.ComponentProps<typeof GridView> & {
  navigation: any;
  data: Pokemon[];
  style?: StyleProp<ViewStyle>;
};

const CARD_WIDTH = 160;

const PokemonList = React.forwardRef(
  (props: Props, ref: React.Ref<ScrollView>) => {
    const renderRow = (rowData: any) => {
      return (
        <PokemonListCard pokemon={rowData} navigation={props.navigation} />
      );
    };

    const getNumberOfColumns = (width: number) => {
      return Math.floor(width / CARD_WIDTH);
    };

    return (
      <GridView
        {...props}
        pageSize={2}
        style={[styles.grid, props.style]}
        spacing={8}
        renderRow={renderRow}
        getNumberOfColumns={getNumberOfColumns}
        ref={ref}
      />
    );
  }
);

PokemonList.displayName = 'PokemonList';

const styles = StyleSheet.create({
  grid: {
    backgroundColor: '#fafafa',
  },
});

export default PokemonList;
