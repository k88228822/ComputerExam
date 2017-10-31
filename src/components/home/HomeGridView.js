/**
 * Created by wangzhen on 2017/10/25.
 */
import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import PropTypes from 'prop-types'
import ScreenSize from "../../utils/index";
import MyTouch from "../common/MyTouch";

const itemWidth = ScreenSize.width * 0.31;

function HomeGridView(props) {

  function renderItem(item,index) {
    return(
      <MyTouch
        key={index}
        onPress={() => {props.onItemClick(index)}}
      >
        <Image
          resizeMode={'contain'} source={item}
          style={index < 3 ? styles.topStyle : styles.middleStyle}
        />

      </MyTouch>
    )
  }

  return (
    <View style={styles.container}>
      {
        props.data.map(
          (info, i) => {
            return (
              renderItem(info, i)
            );
          },
        )
      }

      <View>
        <ImageBackground  style={styles.lastStyle} source={require('../../images/question/countdown.png')}>
          {
            props.time.map(
              (t, i) => {
                return (
                  <View key={i}>
                    <ImageBackground
                      resizeMode={'contain'} style={styles.numberBgStyle}
                      source={require('../../images/question/number_bg.png')}
                    >
                      <Text style={styles.numberStyle}>{t}</Text>
                    </ImageBackground>
                  </View>
                );
              },
            )
          }
        </ImageBackground>
      </View>

    </View>
  );
}

HomeGridView.propTypes={
  data: PropTypes.array.isRequired,
  onItemClick:PropTypes.func.isRequired,
  columnNum:PropTypes.number.isRequired,
  time:PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 12,
  },
  topStyle: {
    width: itemWidth,
    height: (153 / 114) * itemWidth,
  },
  middleStyle: {
    width: itemWidth,
    height: (103 / 114) * itemWidth,
  },
  lastStyle: {
    width: itemWidth,
    height: (103 / 114) * itemWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 25,
  },
  numberStyle: {
    // backgroundColor:'#e13b29',
    color: '#ffffff',
    fontSize: 20,
    backgroundColor: 'rgba(249,249,249,0)',
  },
  numberBgStyle: {
    width: 24,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
})

export default HomeGridView;