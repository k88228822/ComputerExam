/**
 * Created by wangzhen on 2017/10/26.
 */
import React from 'react';
import {StyleSheet,Image, Text, View} from "react-native";
import ScreenSize from "../../utils/index";
import PropTypes from 'prop-types'
import MyTouch from "../common/MyTouch";

function AccountList(props) {
  return (
    <View style={{flex: 1, width: ScreenSize.width}}>
      {
       props.data.map((item,index)=>{
         return(
           <View key={index}>
             <MyTouch onPress={() => {
               props.onItemPress(index);
             }} style={styles.itemContainer}>
               <View style={{flexDirection: 'row'}}>
                 <Image style={styles.itemIcon} source={item.img}/>
                 <Text style={styles.itemText}>{item.title}</Text>
               </View>
               <Image style={styles.rightGo} source={require('../../images/account/light_rightgo.png')}/>
             </MyTouch>
             <View style={{backgroundColor: '#eef1f6', marginHorizontal: 13, height: 1}}/>
           </View>
         )
       })
      }
    </View>
  );
}
AccountList.propTypes={
  data:PropTypes.array,
  onItemPress:PropTypes.func,
}
AccountList.defaultProps={
  data:[],
  onItemPress:()=>{}
}

const styles= StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 46,
  },
  itemIcon: {
    resizeMode: 'contain',
    width: 16,
    height: 16,
  },
  itemText: {
    fontSize: 14,
    color: '#3c4a55',
    marginLeft: 13,
  },
  rightGo: {
    width: 6,
    height: 11,
    marginRight: 8,
  },

})

export default AccountList;