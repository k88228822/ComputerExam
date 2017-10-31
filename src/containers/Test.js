/**
 * Created by wangzhen on 2017/10/27.
 */
import React from 'react';
import {InteractionManager, StyleSheet, Text, View} from "react-native";
import MyStatusBar from "../components/common/MyStatusBar";
import ReturnButton from "../components/common/ReturnButton";
import {NavigationActions} from "react-navigation";
import HeadView from "../components/common/HeadView";
import {connect} from "react-redux";
import TopView from "../components/test/TopView";
import Content from "../components/test/Content";
import {createAction} from "../utils/index";
import BufferPage from "../components/common/BufferPage";
import BottomView from "../components/test/BottomView";

@connect(state => ({...state.test}))
class Test extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    this.renderHeaderTitle = this.renderHeaderTitle.bind(this)
    this.renderHeaderLeft = this.renderHeaderLeft.bind(this)
    this.onPageChanged = this.onPageChanged.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  //标题
  renderHeaderTitle() {
    return (
      <Text style={{fontWeight: 'bold'}}>{this.props.title}</Text>
    );
  }

  //返回按钮
  renderHeaderLeft() {
    return (
      <ReturnButton onClick={() => {
        this.props.dispatch(NavigationActions.back())
      }}/>
    );
  }

  //界面切换处理
  onPageChanged(index) {
    this.props.dispatch(createAction('test/onPageChanged')({index}))
  }

  //选择答案
  onItemClick(status) {
    this.props.dispatch(createAction('test/onItemClicked')({status}));
  }

  //获取题目数据
  getData() {
    this.props.dispatch(createAction('test/clearData')())
    this.props.dispatch(createAction('test/getTestBySIDandDID')({
      subjectId: this.props.navigation.state.params.subjectId,
      directoryId: this.props.navigation.state.params.directoryId
    }));
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      switch (this.props.navigation.state.params.type) {
        case 'exercise':
          this.getData();
          // this.tabView!==undefined? this.tabView.goToPage(0):null;
          break;
      }
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar/>

        <HeadView
          title={this.renderHeaderTitle}
          headLeft={this.renderHeaderLeft}
        />

        <View style={{backgroundColor: '#eef1f6', height: 1}}/>

        <TopView
          type={this.props.type}
          currentNum={this.props.currentNum}
          totalNum={this.props.data.total}
        />
        <View style={styles.bottom}>
        {
          this.props.show?
            <Content style={{backgroundColor:'red'}} dataSource={this.props.dataSource} onPageChanged={this.onPageChanged} onItemClick={this.onItemClick}/>
            :
            <BufferPage style={{position: 'absolute', flex: 1, left: 0, top: 0}}/>
        }

        <BottomView/>
        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bottom:{
    flex:1,
    justifyContent:'space-between',
    flexDirection:'column'
  },
  bottomContainer: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'flex-end',
    flexBasis: 43,
  },

})

export default Test;