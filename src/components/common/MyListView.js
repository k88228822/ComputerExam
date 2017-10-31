/**
 * Created by wangzhen on 2017/10/26.
 */
import React from 'react';
import {ListView, RefreshControl, View} from "react-native";
import PropTypes from 'prop-types'

function MyListView(props) {
  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

  function onRefresh() {
    props.onRefresh()
  }

  return (
    props.showRefresh ?
      <ListView
        style={props.style}
        refreshControl={
          <RefreshControl
            refreshing={props.refresh}
            onRefresh={onRefresh}
            title={props.refresh? '刷新中....' : '下拉刷新'}
          />
        }
        dataSource={ds.cloneWithRows(props.dataSource)}
        renderRow={props.renderRow}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={props.removeClippedSubviews}
        enableEmptySections={true}
      />
      :
      <ListView
        dataSource={ds.cloneWithRows(props.dataSource)}
        renderRow={props.renderRow}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={props.removeClippedSubviews}
        enableEmptySections={true}
      />
  );
}

MyListView.propTypes={
  dataSource: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
  refresh:PropTypes.bool,
  initialListSize: PropTypes.number,
  removeClippedSubviews: PropTypes.bool,
  showRefresh: PropTypes.bool,
  style:PropTypes.number,
}

MyListView.defaultProps={
  dataSource:[],
  onRefresh: () => {},
  initialListSize: 10,
  removeClippedSubviews: true,
  showRefresh: true,
  refresh:false,

}

export default MyListView;