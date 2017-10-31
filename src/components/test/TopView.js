/**
 * Created by wangzhen on 2017/10/27.
 */
import React from 'react';
import {StyleSheet,Image, Text, View} from "react-native";
import PropTypes from 'prop-types'

function TopView(props) {
  return (
    <View style={styles.firstLineContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.typeImg} source={require('../../images/test/danxuan_img.png')}/>
        <Text style={styles.typeText}>{props.type}</Text>
      </View>
      <Text style={styles.num}>
        {`${props.currentNum}/${props.totalNum}`}
      </Text>
    </View>
  );
}

TopView.propTypes={
    type:PropTypes.string.isRequired,
    currentNum:PropTypes.number.isRequired,
    totalNum:PropTypes.number.isRequired
}



const styles = StyleSheet.create({

  firstLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 39,
    paddingHorizontal: 12,
  },
  typeText: {
    fontSize: 13,
    color: '#e21d07',
    marginLeft: 8,
  },
  typeImg: {
    width: 23,
    height: 17,
  },

})


export default TopView;