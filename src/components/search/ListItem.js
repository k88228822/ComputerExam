/**
 * Created by wangzhen on 2017/10/26.
 */
import React from 'react';
import {StyleSheet,Image, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';

function ListItem(props) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={(data) => {props.onSearchItemClick(data);}}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{props.data.name}</Text>
        <Image
          source={props.data.img === 0 ? require('../../images/search/real_test.png') : require('../../images/search/simulation.png')}
          style={styles.itemImg}
        />
      </View>
      <View style={{backgroundColor: '#eef1f6', height: 1}}/>
    </TouchableOpacity>
  );
}
ListItem.propTypes={
  onSearchItemClick:PropTypes.func,
  data:PropTypes.object.isRequired,
}
ListItem.defaultProps={
  onSearchItemClick:(data)=>{},
}

const styles=StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 17,
    alignItems: 'center',
  },
  itemImg: {
    width: 32,
    height: 16,
    marginLeft: 9,
  },
  itemText: {
    fontSize: 12,
    color: '#3c4a55',
  },
})

export default ListItem;