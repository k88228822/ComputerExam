/**
 * Created by wangzhen on 2017/10/31.
 */
import React from 'react';
import {DeviceEventEmitter,Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import ScreenSize from "../../utils/index";
import MyTouch from "../common/MyTouch";

class BottomView extends React.Component{

  static propTypes={
    goPrePage:PropTypes.func ,
    onAnswerCardPress:PropTypes.func,
    onCollectPress:PropTypes.func,
    onAnswerPress:PropTypes.func,
    goNextPage:PropTypes.func,
    showAnswer:PropTypes.bool,
    isCollected:PropTypes.bool,
  }

  static defaultProps={
    goPrePage:()=>{},
    onAnswerCardPress:()=>{},
    onCollectPress:()=>{},
    onAnswerPress:()=>{},
    goNextPage:()=>{},
    showAnswer:false,
    isCollected:false,
  }

  componentWillUnmount(){
    this.subscription.remove();
  }

  componentDidMount(){
    this.subscription = DeviceEventEmitter.addListener('goPage',(data)=>{
      console.log('hello,change:'+data)
    })
  }

  render(){
    return (
      <View>
        <View style={{backgroundColor: '#eef1f6', height: 1}}/>

        <View style={styles.bottomImgContainer}>

          <MyTouch style={styles.touchStyle} onPress={() => {
            this.props.goPrePage();
          }}>
            <Image style={styles.bottomImg} source={require('../../images/test/pre.png')}/>
          </MyTouch>

          <MyTouch  style={styles.touchStyle} onPress={() => {
            this.props.onAnswerCardPress();
          }}>
            <Image style={styles.bottomImg} source={require('../../images/test/answerCard.png')}/>
          </MyTouch>

          <MyTouch style={styles.touchStyle} onPress={() => {this.props.onCollectPress();}}>
            <Image style={styles.bottomImg} source={
              this.props.isCollected ?
                require('../../images/test/collect_selected.png') :
                require('../../images/test/collect.png')
            }
            />
          </MyTouch>

          <MyTouch style={styles.touchStyle} onPress={() => {
            this.props.onAnswerPress();
          }}>
            <Image
              style={styles.bottomImg}
              source={this.props.showAnswer ?
                require('../../images/test/answer_selected.png') :
                require('../../images/test/answer.png')}
            />
          </MyTouch>

          <MyTouch style={styles.touchStyle} onPress={() => {this.props.goNextPage();}}>
            <Image style={styles.bottomImg} source={require('../../images/test/next.png')}/>
          </MyTouch>

        </View>

      </View>
    );
  }
}


const styles=StyleSheet.create({
  bottomContainer:{
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'flex-end',
    flexBasis: 43,
  },
  bottomImgContainer: {
    height: 43,
    width: ScreenSize.width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  bottomImg: {
    height: 30,
    width: 23,
    resizeMode: 'contain',
  },
  touchStyle:{
    padding:5,
  }


})
export default BottomView;