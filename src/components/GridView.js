/* @flow */

import React, { PureComponent } from 'react';
import { Platform, Dimensions, ListView, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

type Props = {
  data: Array<any>,
  spacing: number,
  getNumberOfColumns: (width: number) => number,
  renderRow: (
    rowData: any,
    rowID: string,
    highlightRow: boolean
  ) => ?React.Element<any>,
  onLayout?: Function,
  contentContainerStyle?: any,
  style?: any,
};

type State = {
  dataSource: ListView.DataSource,
  containerWidth: number,
};

export default class GridView extends PureComponent<Props, State> {
  static defaultProps = {
    getNumberOfColumns: () => 1,
    spacing: 0,
  };

  state: State = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }),
    containerWidth: Dimensions.get('window').width,
  };

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        this._processData(this.state.containerWidth, this.props)
      ),
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        this._processData(this.state.containerWidth, nextProps)
      ),
    });
  }

  scrollTo(options: any) {
    this._root.scrollTo(options);
  }

  _root: Object;

  _renderRow = (rowData: any, rowID: string, highlightRow: boolean) => {
    return (
      <View style={rowData.style}>
        {this.props.renderRow(rowData.tile, rowID, highlightRow)}
      </View>
    );
  };

  _processData = (containerWidth: number, props: Props) => {
    const { getNumberOfColumns, spacing, data } = props;
    const style = {
      width:
        (containerWidth - spacing) / getNumberOfColumns(containerWidth) -
        spacing,
      margin: spacing / 2,
    };
    return data.map(tile => ({
      tile,
      style,
    }));
  };

  _handleLayout = (e: any) => {
    if (this.props.onLayout) {
      this.props.onLayout(e);
    }

    if (this.state.containerWidth === e.nativeEvent.layout.width) {
      return;
    }

    const containerWidth = e.nativeEvent.layout.width;

    this.setState({
      containerWidth,
      dataSource: this.state.dataSource.cloneWithRows(
        this._processData(containerWidth, this.props)
      ),
    });
  };

  _setRef = (c: Object) => (this._root = c);

  render() {
    return (
      <ListView
        {...this.props}
        removeClippedSubviews={Platform.OS !== 'ios'}
        enableEmptySections={false}
        dataSource={this.state.dataSource}
        onLayout={this._handleLayout}
        renderRow={this._renderRow}
        contentContainerStyle={[
          styles.grid,
          { padding: this.props.spacing / 2 },
          this.props.contentContainerStyle,
        ]}
        ref={this._setRef}
      />
    );
  }
}
