/**
 * Created by wangzhen on 2017/10/26.
 */
import React from 'react';
import {InteractionManager, StyleSheet, View} from "react-native";
import MyStatusBar from "../components/common/MyStatusBar";
import HeadView from "../components/common/HeadView";
import SearchHead from "../components/search/SearchHead";
import {createAction} from "../utils/index";
import MyListView from "../components/common/MyListView";
import ListItem from "../components/search/ListItem";
import {connect} from "react-redux";
import HistoryAndRecommend from "../components/search/HistoryAndRecommend";

@connect(state => ({...state.search}))
class Search extends React.Component {
  // 构造
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.onSearchItemClick = this.onSearchItemClick.bind(this);
    this.renderRow = this.renderRow.bind(this);

  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(createAction('search/getSearchRecommend')())
    })
  }

  onChangeText(text) {
    this.props.dispatch(createAction('search/setTextAndResult')({text, showResult: text.length > 0}));
  }

  onEndEditing() {

  }

  renderHeader() {
    return (
      <SearchHead onChangeText={this.onChangeText} onEndEditing={this.onEndEditing}/>
    )
  }

  onSearchItemClick(data) {
    this.props.dispatch(createAction('search/addSearchHistory')())
  }

  renderRow(rowData) {
    return (
      <ListItem data={rowData} onSearchItemClick={this.onSearchItemClick}/>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <MyStatusBar/>

        <HeadView title={this.renderHeader}/>

        {
          this.props.showResult ?
            <MyListView
              style={styles.listView}
              dataSource={this.props.dataSource}
              renderRow={this.renderRow}
            />
            :
            <HistoryAndRecommend
              historyData={this.props.history}
              recommendData={this.props.recommend}
            />
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listView: {
    marginLeft: 13,
    marginRight: 13,
  },

})

export default Search;