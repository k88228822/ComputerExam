/**
 * Created by wangzhen on 2017/11/6.
 */
import React from 'react';
import {InteractionManager,StyleSheet, Text, View} from "react-native";
import MyStatusBar from "../components/common/MyStatusBar";
import {createAction} from "../utils/index";
import {connect} from "react-redux";
import HistoryHead from "../components/historyTest/HistoryHead";
import {NavigationActions} from 'react-navigation';
import BufferPage from "../components/common/BufferPage";
import HistoryList from "../components/historyTest/HistoryList";
import ScreenSize from "../utils/index";
import DownloadModal from "../components/historyTest/DownloadModal";

@connect(state=>({...state.history}))
class HistoryTest extends React.Component {
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {};
      this.onDownloadPress=this.onDownloadPress.bind(this);
      this.onReturnPress=this.onReturnPress.bind(this);
      this.onItemClick=this.onItemClick.bind(this);
    }


  componentDidMount(){

  }

  onReturnPress(){
    this.props.dispatch(NavigationActions.back());
  }

  onDownloadPress(){
    this.props.dispatch(createAction('history/onDownloadPress')())
  }

  //列表点击事件
  onItemClick(rowData, index) {
    if (this.props.show) {//下载状态点击
      this.props.dispatch(createAction('history/downloadTest')({index}))
    } else {//未下载状态点击
      this.props.navigation.navigate('Test',
        {
          type: 'history',
          directoryId: rowData.id,
          subjectId: rowData.subjectId,
        }
      );
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(()=>{
      this.props.dispatch(createAction('history/initData')({
        issueKind: this.props.navigation.state.params.isSubject ? 1 : 2
    }));
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar/>

        <HistoryHead
          title={this.props.title}
          onDownPress={this.onDownloadPress}
          onReturnPress={this.onReturnPress}
        />

        <View style={{height: 1, backgroundColor: '#eef1f6'}}/>

        <View style={{flex: 1}}>
          {
            this.props.showContent?
              <View
                style={styles.listView}
              >
                <HistoryList data={this.props.data} onItemClick={this.onItemClick}/>
              </View>
              :
              <BufferPage style={{position: 'absolute', backgroundColor: 'gray', left: 0, top: 0}}/>
          }
        </View>

        <DownloadModal progress={this.props.downloadProgress} isVisible={this.props.showDownload}/>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  headerRightTitle: {
    fontSize: 13,
    color: '#568da8',
    marginRight: 18,
    marginVertical:10,
    marginLeft:10,
  },

  listView: {
    width: ScreenSize.width,
    paddingHorizontal: 15,
  },
})

export default HistoryTest;