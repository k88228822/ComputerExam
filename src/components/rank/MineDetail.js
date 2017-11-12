/**
 * Created by wangzhen on 2017/11/9.
 */
import React from 'react';
import {StyleSheet,Image, Text, View} from "react-native";
import PropType from 'prop-types';

function MineDetail(props) {
  return (
    <View style={styles.mineContainer}>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#3c4a55'}}>{props.num}</Text>
        <Text style={{fontSize: 10, marginLeft: 5, color: '#3c4a55'}}>题</Text>
      </View>
      <View style={{alignItems: 'center',}}>
        <Image style={styles.titleImg} source={require('../../images/account/head.png')}/>
        <Text style={{fontSize: 10, marginTop: 10, color: '#568da8'}}>{props.name}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#3c4a55'}}>{props.rank}</Text>
        <Text style={{fontSize: 10, marginLeft: 5, color: '#3c4a55'}}>名</Text>
      </View>
    </View>
  );

}

MineDetail.propTypes={
  num:PropType.number.isRequired,
  name:PropType.string.isRequired,
  rank:PropType.number.isRequired,
}

const styles=StyleSheet.create({
  mineContainer: {
    marginHorizontal: 53,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 116,
  },
  titleImg: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },


});

export default MineDetail;