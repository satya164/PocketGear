import React, { useEffect, useState } from 'react';
import ListView from 'deprecated-react-native-listview';
import {
  Platform,
  Dimensions,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
  ScrollView,
} from 'react-native';

type Props = React.ComponentProps<typeof ListView> & {
  data: any[];
  spacing: number;
  pageSize?: number;
  getNumberOfColumns: (width: number) => number;
  renderRow: (
    rowData: any,
    rowID: string,
    highlightRow: React.ReactText
  ) => React.ReactNode;
  onLayout?: (e: LayoutChangeEvent) => void;
  contentContainerStyle?: any;
  style?: StyleProp<ViewStyle>;
};

const GridView = React.forwardRef(
  (props: Props, ref: React.Ref<ScrollView>) => {
    const [dataSource, setDataSource] = useState<ListView.DataSource>(
      new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      })
    );
    const [containerWidth, setContainerWidth] = useState(
      Dimensions.get('window').width
    );

    useEffect(() => {
      setDataSource(
        dataSource.cloneWithRows(processData(containerWidth, props))
      );
    }, [containerWidth, props]);

    const renderRow = (
      rowData: any,
      rowID: string,
      highlightRow: React.ReactText
    ) => {
      return (
        <View style={rowData.style}>
          {props.renderRow(rowData.tile, rowID, highlightRow)}
        </View>
      );
    };

    const processData = (containerWidth: number, props: Props) => {
      const { getNumberOfColumns, spacing, data } = props;
      const style = {
        width:
          (containerWidth - spacing) / getNumberOfColumns(containerWidth) -
          spacing,
        margin: spacing / 2,
      };
      return data.map((tile) => ({
        tile,
        style,
      }));
    };

    const onLayout = (e: LayoutChangeEvent) => {
      if (props.onLayout) {
        props.onLayout(e);
      }

      if (containerWidth === e.nativeEvent.layout.width) {
        return;
      }

      const newContainerWidth = e.nativeEvent.layout.width;

      setContainerWidth(newContainerWidth);
      setDataSource(
        dataSource.cloneWithRows(processData(newContainerWidth, props))
      );
    };

    return (
      <ListView
        {...props}
        removeClippedSubviews={Platform.OS !== 'ios'}
        enableEmptySections={false}
        dataSource={dataSource}
        onLayout={onLayout}
        renderRow={renderRow}
        contentContainerStyle={[
          styles.grid,
          { padding: props.spacing / 2 },
          props.contentContainerStyle,
        ]}
        ref={ref}
      />
    );
  }
);

GridView.displayName = 'GridView';

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

export default GridView;
