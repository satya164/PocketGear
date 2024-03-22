import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type Props<T> = Omit<React.ComponentProps<typeof FlatList<T>>, 'renderItem'> & {
  spacing?: number;
  pageSize?: number;
  getNumberOfColumns: (width: number) => number;
  renderRow: (item: T) => React.ReactElement;
  onLayout?: (e: LayoutChangeEvent) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

const GridViewInner = <T,>(
  {
    data,
    spacing = 8,
    contentContainerStyle,
    renderRow,
    onLayout: onLayoutCustom,
    getNumberOfColumns,
    ...rest
  }: Props<T>,
  ref?: React.Ref<FlatList>
) => {
  const [containerWidth, setContainerWidth] = useState(
    Dimensions.get('window').width
  );

  const renderItem = ({ item }: { item: T }) => {
    return (
      <View style={{ flex: 1, margin: spacing / 2 }}>{renderRow(item)}</View>
    );
  };

  const onLayout = (e: LayoutChangeEvent) => {
    onLayoutCustom?.(e);

    if (containerWidth === e.nativeEvent.layout.width) {
      return;
    }

    const newContainerWidth = e.nativeEvent.layout.width;

    setContainerWidth(newContainerWidth);
  };

  const numColumns = getNumberOfColumns(containerWidth);

  return (
    <FlatList<T>
      {...rest}
      key={numColumns}
      numColumns={numColumns}
      removeClippedSubviews={Platform.OS !== 'ios'}
      keyboardDismissMode="on-drag"
      data={data}
      onLayout={onLayout}
      renderItem={renderItem}
      contentContainerStyle={[{ padding: spacing / 2 }, contentContainerStyle]}
      ref={ref}
    />
  );
};

const GridView = React.forwardRef(GridViewInner) as <T>(
  p: Props<T> & { ref?: React.Ref<FlatList> }
) => React.ReactElement;

// @ts-expect-error - forwardRef type is not accurate
GridView.displayName = 'GridView';

export default GridView;
