/**
 * Created by wangzhen on 2017/11/6.
 */
import React from 'react';
import {StyleSheet,Modal, View} from "react-native";
import AnswerCardHead from "./AnswerCardHead";
import AnswerCardSelect from "./AnswerCardSelect";
import PropTypes from 'prop-types';
import AnswerCardBottom from "./AnswerCardBottom";
import ScreenSize from "../../utils/index";

function AnswerCardModal(props) {

  return (
    <Modal
      style={{height:ScreenSize.height,width:ScreenSize.width}}
      animationType={'slide'}
      transparent={false}
      visible={props.isVisible}
      onRequestClose={() => {}}
    >
      <AnswerCardHead onClose={props.onClose}/>

      <View style={{backgroundColor: '#eef1f6', height: 1}}/>

      <AnswerCardSelect
        onItemSelected={props.onItemSelected}
        data={props.data}
        currentNum={props.currentNum}
      />

      <AnswerCardBottom
        onReStartPress={props.onReStartPress}
        onClose={props.onClose}/>

    </Modal>
  );
}

AnswerCardModal.propTypes={
  data:PropTypes.object.isRequired,
  isVisible:PropTypes.bool,
  onClose:PropTypes.func,
  onItemSelected:PropTypes.func,
  currentNum:PropTypes.number,
  onReStartPress:PropTypes.func.isRequired,
}
AnswerCardModal.defaultProps={
  isVisible:false,
  onClose:()=>{},
  currentNum:0,
}


export default AnswerCardModal;