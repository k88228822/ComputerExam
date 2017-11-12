/**
 * Created by wangzhen on 2017/11/9.
 */
import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import MyStatusBar from "../components/common/MyStatusBar";
import ReturnButton from "../components/common/ReturnButton";
import {NavigationActions} from 'react-navigation'
import HeadView from "../components/common/HeadView";
import MineDetail from "../components/rank/MineDetail";

@connect(state => ({...state.rank}))
class Rank extends React.Component {

  // 构造
  constructor(props) {
    super(props);
    this.renderHeaderLeft = this.renderHeaderLeft.bind(this);
    this.renderHeaderTitle = this.renderHeaderTitle.bind(this);
  }

  renderHeaderTitle() {
    return (
      <View>
        <Text>刷题学霸上榜</Text>
      </View>
    )
  }

  renderHeaderLeft() {
    return (
      <ReturnButton onClick={() => {
        this.props.dispatch(NavigationActions.back())
      }}/>
    );
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

        <MineDetail
          name={this.props.name}
          num={this.props.num}
          rank={this.props.rank}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

})

export default Rank;