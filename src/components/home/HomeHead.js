/**
 * Created by wangzhen on 2017/10/23.
 */
import React from 'react';
import {Image, Text, StyleSheet} from "react-native";
import PropTypes from 'prop-types'
import HeadView from "../common/HeadView";
import MyTouch from "../common/MyTouch";


function HomeHead(props) {

  function renderTitle() {
    return (<Text style={{alignSelf: 'center', fontWeight: 'bold'}}>{props.title}</Text>);
  }

  function renderHeaderLeft() {
    return (<Image source={require('../../images/main/logo.png')} style={styles.headLogoStyle}/>);
  }

  function renderHeaderRight() {
    return (
      <MyTouch onPress={props.onHeaderRightPress}>
        <Image source={require('../../images/main/category.png')} style={styles.headRightStyle}/>
      </MyTouch>
    );
  }

  return (
    <HeadView
      title={renderTitle}
      headLeft={renderHeaderLeft}
      headerRight={renderHeaderRight}
    />
  );
}

HomeHead.protoType={
  title:PropTypes.string.isRequired,
   onHeaderRightPress:PropTypes.func.isRequired
}

HomeHead.defaultProps={

}

const styles = StyleSheet.create({
  headLogoStyle: {
    width: 41,
    height: 24,
    marginLeft: 15,
  },
  headRightStyle: {
    width: 17,
    height: 16,
    margin: 10,
    resizeMode: 'contain'
  },
})

export default HomeHead;