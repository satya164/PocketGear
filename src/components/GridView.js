/* @flow */

import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { ListView as List } from 'realm/react-native';

const {
  Dimensions,
  StyleSheet,
  ListView,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

type Props = {
  data: Array<any>;
  spacing: number;
  getNumberOfColumns: (width: number) => number;
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
  dataSource: List.DataSource;
  containerWidth: number;
}

export default class GridView extends Component<DefaultProps, Props, State> {
  static propTypes = {
    data: PropTypes.array.isRequired,
    spacing: PropTypes.number.isRequired,
    getNumberOfColumns: PropTypes.func.isRequired,
    renderRow: PropTypes.func.isRequired,
    onLayout: PropTypes.func,
    contentContainerStyle: ListView.propTypes.style,
    style: View.propTypes.style,
  };

  static defaultProps = {
    getNumberOfColumns: () => 1,
    spacing: 0,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      dataSource: new List.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      containerWidth: Dimensions.get('window').width,
    };
  }

  state: State;

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.data),
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.data),
    });
  }

  _renderRow = (rowData: any, sectionID: string, rowID: string, highlightRow: boolean) => {
    return (
      <View
        style={{
          margin: this.props.spacing / 2,
          width: (this.state.containerWidth - (this.props.spacing * 3)) / this.props.getNumberOfColumns(this.state.containerWidth)
        }}
      >
        {this.props.renderRow(rowData, sectionID, rowID, highlightRow)}
      </View>
    );
  };

  _handleLayout = (e: any) => {
    if (this.props.onLayout) {
      this.props.onLayout(e);
    }

    this.setState({
      containerWidth: e.nativeEvent.layout.width,
    });
  };

  render() {
    return (
      <List
        {...this.props}
        dataSource={this.state.dataSource}
        onLayout={this._handleLayout}
        renderRow={this._renderRow}
        contentContainerStyle={[ styles.grid, { padding: this.props.spacing / 2 }, this.props.contentContainerStyle ]}
      />
    );
  }
}
