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
import ToastUtil from "../utils/ToastUtil";
import AnswerCardModal from "../components/test/AnswerCardModal";

@connect(state => ({...state.test}))
class Test extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    this.renderHeaderTitle = this.renderHeaderTitle.bind(this)
    this.renderHeaderLeft = this.renderHeaderLeft.bind(this)
    this.onPageChanged = this.onPageChanged.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.goPrePage = this.goPrePage.bind(this);
    this.goNextPage = this.goNextPage.bind(this);
    this.onCollectPress = this.onCollectPress.bind(this);
    this.onAnswerCardPress = this.onAnswerCardPress.bind(this);
    this.onCloseAnswerCard=this.onCloseAnswerCard.bind(this);
    this.onCardItemSelected=this.onCardItemSelected.bind(this);
    this.reStart=this.reStart.bind(this);
    this.onAnswerPress=this.onAnswerPress.bind(this);
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

  //点击答题卡按钮
  onAnswerCardPress() {
    this.props.dispatch(createAction('test/setAnswerCard')({modelVisible: true}))
  }

  //关闭答提卡回调
  onCloseAnswerCard() {
    this.props.dispatch(createAction('test/setAnswerCard')({modelVisible:false}))
  }

  //答题卡选中题号
  onCardItemSelected(index) {
    this.props.dispatch(createAction('test/setAnswerCard')({modelVisible:false}))
    setTimeout(() => {
      this.scrollView.goToPage(index);
    }, 100);
  }

  //重新答题
  reStart() {
    this.props.dispatch(createAction('test/clearData')())
    setTimeout(() => {
      this.scrollView.goToPage(0);
    }, 100);
    this.getData();
  }

  //点击收藏按钮
  onCollectPress() {
    this.props.dispatch(createAction('test/onCollectPress')());
  }

  //返回下一页
  goNextPage() {
    if (this.props.currentNum === this.props.data.total) {
      ToastUtil.showShort('已经是最后一题了哦');
      return;
    }
    this.scrollView.goToPage(this.props.currentNum);
  }

  //返回上一页
  goPrePage() {
    let num = this.props.currentNum;
    if (num === 1) {
      ToastUtil.showShort('已经是第一题了哦');
      return;
    }
    this.scrollView.goToPage(num-2)
  }

  //点击显示/隐藏答案
  onAnswerPress() {
    this.props.dispatch(createAction('test/answerPress')())
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      switch (this.props.navigation.state.params.type) {
        case 'exercise':
          this.getData();
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
            this.props.show ?
              <Content
                ref={content=>this.scrollView=content}
                style={{backgroundColor: 'red'}}
                pageNum={this.props.currentNum}
                dataSource={this.props.dataSource}
                onPageChanged={this.onPageChanged}
                onItemClick={this.onItemClick}
              />
              :
              <BufferPage style={{position: 'absolute', flex: 1, left: 0, top: 0}}/>
          }

          <BottomView
            onAnswerCardPress={this.onAnswerCardPress}
            onCollectPress={this.onCollectPress}
            goNextPage={this.goNextPage}
            goPrePage={this.goPrePage}
            isCollected={this.props.isCollected}
            onAnswerPress={this.onAnswerPress}
            showAnswer={this.props.showAnswer}
          />

          <AnswerCardModal
            data={this.props.data}
            currentNum={this.props.currentNum}
            onItemSelected={this.onCardItemSelected}
            onClose={this.onCloseAnswerCard}
            isVisible={this.props.modelVisible}
            onReStartPress={this.reStart}
          />

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
  bottom: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  bottomContainer: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'flex-end',
    flexBasis: 43,
  },

})

export default Test;