/**
 * Created by wangzhen on 2017/10/27.
 */
import React from 'react';
import {View} from "react-native";
import PropTypes from 'prop-types'
import MyListView from "../common/MyListView";
import ListItem from "./ListItem";

function ContentList(props) {

  function renderRow(rowData,SectionID,rowID) {
    return (
      <ListItem
        rowID={rowID}
        rowData={rowData}
        onItemClick={props.onItemClick}
      />
    )
  }

  return (
    <MyListView
      showRefresh={false}
      dataSource={props.listData}
      renderRow={renderRow}
    />
  );
}

ContentList.propTypes = {
  listData: PropTypes.array,
  onItemClick:PropTypes.func,
}

ContentList.defaultProps = {
  listData: [],
  onItemClick:()=>{}
}

export default ContentList;