/**
 * Created by wangzhen on 2017/10/23.
 */
import React from 'react';
import {StyleSheet,Image, View} from "react-native";
import {Carousel} from "antd-mobile";
import ScreenSize from "../../utils/index";
import PropTypes from 'prop-types'

function Swiper(props) {
  return (
    <View>
      <Carousel
        style={{width:ScreenSize.width,height:142}}
        autoplay={true}
        infinite
        swipeSpeed={100}
      >
        {
          props.urls.map((url, index) => {
            return (
              <View key={index} style={styles.slide1}>
                <Image
                  key={index}
                  style={styles.bannerImageStyle}
                  resizeMode={'stretch'}
                  source={{uri: url}}
                />
              </View>
            )
          })
        }
      </Carousel>

    </View>
  );
}

const styles = StyleSheet.create({
  bannerImageStyle: {
    width: ScreenSize.width,
    height: 142,
    backgroundColor: '#ffffff',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

})

Swiper.propTypes={
  urls:PropTypes.array.isRequired,
}

export default Swiper;