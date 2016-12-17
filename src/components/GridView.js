/* @flow */

import React, { PureComponent, PropTypes } from 'react';
import {
  Platform,
  Dimensions,
  ListView,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

type Props = {
  data: { [key: string]: Array<any> };
  spacing: number;
  getNumberOfColumns: (width: number) => number;
  renderSectionHeader?: (sectionData: any, sectionID: string) => ?React.Element<*>;
  renderRow: (rowData: any, sectionID: string, rowID: string, highlightRow: boolean) => ?React.Element<*>;
  onLayout?: Function;
  contentContainerStyle?: any;
  style?: any;
}

type DefaultProps = {
  getNumberOfColumns: (width: number) => number;
  spacing: number;
}

type State = {
  dataSource: ListView.DataSource;
  containerWidth: number;
}

export default class GridView extends PureComponent<DefaultProps, Props, State> {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.array).isRequired,
    spacing: PropTypes.number.isRequired,
    getNumberOfColumns: PropTypes.func.isRequired,
    renderSectionHeader: PropTypes.func,
    renderRow: PropTypes.func.isRequired,
    onLayout: PropTypes.func,
    contentContainerStyle: View.propTypes.style,
    style: View.propTypes.style,
  };

  static defaultProps = {
    getNumberOfColumns: () => 1,
    spacing: 0,
  };

  state: State = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    }),
    containerWidth: Dimensions.get('window').width,
  };

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(
        this._processData(this.state.containerWidth, this.props)
      ),
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(
        this._processData(this.state.containerWidth, nextProps)
      ),
    });
  }

  scrollTo(options: any) {
    this._root.scrollTo(options);
  }

  _root: Object;

  _renderSectionHeader = (sectionData: any, sectionID: string) => {
    const header = this.props.renderSectionHeader ? this.props.renderSectionHeader(sectionData, sectionID) : null;
    if (header === null) {
      return null;
    }
    const { containerWidth } = this.state;
    return <View style={{ width: containerWidth }}>{header}</View>;
  };

  _renderRow = (rowData: any, sectionID: string, rowID: string, highlightRow: boolean) => {
    return (
      <View style={rowData.style}>
        {this.props.renderRow(rowData.tile, sectionID, rowID, highlightRow)}
      </View>
    );
  };

  _processData = (containerWidth: number, props: Props) => {
    const { getNumberOfColumns, spacing, data } = props;
    const style = {
      width: ((containerWidth - spacing) / getNumberOfColumns(containerWidth)) - spacing,
      margin: spacing / 2,
    };
    const nextData = {};
    for (const prop in data) {
      nextData[prop] = data[prop].map(tile => ({
        tile,
        style,
      }));
    }
    return nextData;
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
      dataSource: this.state.dataSource.cloneWithRowsAndSections(
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
        renderSectionHeader={this._renderSectionHeader}
        renderRow={this._renderRow}
        contentContainerStyle={[ styles.grid, { padding: this.props.spacing / 2 }, this.props.contentContainerStyle ]}
        ref={this._setRef}
      />
    );
  }
}
