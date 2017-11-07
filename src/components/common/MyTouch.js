/**
 * Created by wangzhen on 2017/10/23.
 */
import React from 'react';
import {View, StyleSheet, TouchableHighlight} from "react-native";
import PropTypes from 'prop-types'

function MyTouch(props) {
  return (
    <TouchableHighlight
      style={{backgroundColor: '#ffffff'}}
      underlayColor={props.underlayColor}
      activeOpaciy={props.activeOpacity}
      onPress={() => {props.onPress()}}
    >
      <View style={props.style}>
        {props.children}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  defaultTouch: {
    backgroundColor: '#ffffff'
  }
})

MyTouch.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.number,
  underlayColor: PropTypes.string,
  activeOpacity: PropTypes.number,
}

MyTouch.defaultProps = {
  underlayColor: '#f2f4f7',
  activeOpacity: 1
}

export default MyTouch;