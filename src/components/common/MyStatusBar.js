/**
 * Created by wangzhen on 2017/10/23.
 */
import React from 'react';
import {View,Platform,StatusBar} from "react-native";
import PropTypes from 'prop-types';
import ScreenSize from "../../utils/index";

function MyStatusBar(props) {
  return (
   <View>
     {
       Platform.OS === 'ios' ?
         < StatusBar
           backgroundColor={'#efefef'}
           barStyle="dark-content"
         />
         :
         <StatusBar
           backgroundColor={'#ffffff'}
           translucent={true}
           hidden={props.hidden}
           barStyle={'dark-content'}
           animated={false}
         />
     }
   </View>
  );
}

MyStatusBar.propTypes={
  hidden:PropTypes.bool
}
MyStatusBar.defaultProps={
  hidden:false
}

export default MyStatusBar;