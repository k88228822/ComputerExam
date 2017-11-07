/**
 * Created by wangzhen on 2017/11/6.
 */
import React from 'react';
import HeadView from "../common/HeadView";
import PropTypes from 'prop-types';
import {StyleSheet,Image, Text} from "react-native";

function AnswerCardHead(props) {
  function renderHeaderTitle(){
    return (
      <Text style={styles.headerTitle}>答题卡</Text>
    );
  }

  function renderHeaderLeft() {
    return (
      <Image style={styles.headerLeft} source={require('../../images/test/answer_return.png')}/>
    );

  }

  return (
    <HeadView
      onLeftPress={()=>{props.onClose()}}
      title={renderHeaderTitle}
      headLeft={renderHeaderLeft}
    />
  );
}

AnswerCardHead.propTypes={
  onClose:PropTypes.func ,
}
AnswerCardHead.defaultProps={
 onClose:()=>{},
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 15,
    color: '#3c4a55'
  },
  headerLeft: {
    width: 16,
    height: 10,
    resizeMode: 'contain',
    marginLeft: 15
  },

})



export default AnswerCardHead;