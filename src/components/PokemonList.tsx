import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, FlatList } from 'react-native';
import GridView from './GridView';
import PokemonListCard from './PokemonListCard';
import { Pokemon } from '../types';

type Props = Omit<
  React.ComponentProps<typeof GridView<Pokemon>>,
  'getNumberOfColumns' | 'renderRow'
> & {
  navigation: any;
  data: Pokemon[];
  style?: StyleProp<ViewStyle>;
};

const CARD_WIDTH = 160;

const PokemonList = React.forwardRef(
  ({ navigation, data, style, ...rest }: Props, ref: React.Ref<FlatList>) => {
    const renderRow = (item: Pokemon) => {
      return <PokemonListCard pokemon={item} navigation={navigation} />;
    };

    const getNumberOfColumns = (width: number) => {
      return Math.floor(width / CARD_WIDTH);
    };

    return (
      <GridView<Pokemon>
        {...rest}
        data={data}
        pageSize={2}
        style={[styles.grid, style]}
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
