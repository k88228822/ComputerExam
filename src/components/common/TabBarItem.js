import React, {Component} from 'react';
import {StyleSheet,Image, View} from 'react-native';
import PropTypes from 'prop-types'
import ScreenSize from "../../utils/index";

function TabBarItem(props) {
  const selectedImage = props.selectedImage ? props.selectedImage : props.normalImage;
  return (
    <Image
      source={props.focused
        ? selectedImage
        : props.normalImage}
      style={{width: 20, height: 20, resizeMode: 'contain'}}
    />
  );
}

TabBarItem.propTypes = {
  selectedImage: PropTypes.number.isRequired,
  normalImage: PropTypes.number.isRequired,
}

TabBarItem.defaultProps = {}

const styles=StyleSheet.create({
  container:{
    width:ScreenSize.width/6 ,
    height:30,
  },
  image:{

  }
})
export default TabBarItem;
