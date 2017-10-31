import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import MyTouch from "./MyTouch";
import PropTypes from 'prop-types'

function ReturnButton(props) {
  return (
    <MyTouch style={styles.container} onPress={props.onClick}>
      <Image style={styles.returnImg} source={require('../../images/main/return.png')}/>
    </MyTouch>
  );
}
ReturnButton.propTypes={
  onClick:PropTypes.func,

}

ReturnButton.defaultProps={
  onClick:()=>{}
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 20,
    paddingVertical: 12,
  },
  returnImg: {
    width: 10,
    height: 16,
  },
})

export default ReturnButton;