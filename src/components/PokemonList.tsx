import React from 'react';
import {
  FlatList,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type { Pokemon } from '../types';
import GridView from './GridView';
import PokemonListCard from './PokemonListCard';

type Props = Omit<
  React.ComponentProps<typeof GridView<Pokemon>>,
  'getNumberOfColumns' | 'renderRow'
> & {
  data: Pokemon[];
  style?: StyleProp<ViewStyle>;
};

const CARD_WIDTH = 160;

const PokemonList = React.forwardRef(
  ({ data, style, ...rest }: Props, ref: React.Ref<FlatList>) => {
    const renderRow = (item: Pokemon) => {
      return <PokemonListCard pokemon={item} />;
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
