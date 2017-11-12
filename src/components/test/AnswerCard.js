/**
 * Created by wangzhen on 2017/11/12.
 */
import React from 'react';
import {StyleSheet, View} from "react-native";
import PropType from 'prop-types'
import AnswerCardHead from "./AnswerCardHead";
import AnswerCardSelect from "./AnswerCardSelect";
import AnswerCardBottom from "./AnswerCardBottom";
import ScreenSize from "../../utils/index";
import MyStatusBar from "../common/MyStatusBar";
import {connect} from "react-redux";

@connect(state => ({...state.test}))
class AnswerCard extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
    this.onClose = this.onClose.bind(this);
    this.onItemSelected = this.onItemSelected.bind(this);
    this.onRestartPress = this.onRestartPress.bind(this);
  }

  onClose() {
    const {goBack, state} = this.props.navigation;
    // state.params.callback();
    goBack();
  }

  onItemSelected(index) {
    const {goBack, state} = this.props.navigation;
    state.params.callback('itemSelect', index);
    goBack();

  }

  onRestartPress() {
    const {goBack, state} = this.props.navigation;
    state.params.callback('onRestartPress');
    goBack();
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <MyStatusBar/>

        <AnswerCardHead onClose={this.onClose}/>

        <View style={{backgroundColor: '#eef1f6', height: 1}}/>

        <AnswerCardSelect
          onItemSelected={this.onItemSelected}
          data={this.props.data}
          currentNum={this.props.currentNum}
        />

        <AnswerCardBottom
          onReStartPress={this.onRestartPress}
          onClose={this.onClose}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    height: ScreenSize.height,
    width: ScreenSize.width,
    backgroundColor: '#ffffff',
  }
})

export default AnswerCard;