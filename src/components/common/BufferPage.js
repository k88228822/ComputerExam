import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

function BufferPage(props) {
  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <Image
          source={require('../../images/loading.gif')}
          style={{width:21,height:21,resizeMode:'contain'}}
        />
        <Text style={styles.text}>努力加载中...</Text>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff',
    justifyContent:'center',
    alignItems:'center'
  },
  contentView:{
    alignItems:'center',
  },
  text:{
    fontSize:12,
    color:'#a0a0a0',
    marginTop:10,
  }

});

export default BufferPage;