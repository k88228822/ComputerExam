/**
 * Created by wangzhen on 2017/6/24.
 */
import React from 'react';
import {Modal, View,StyleSheet} from "react-native";
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types'

export default class DownloadModal extends React.Component {
  static propTypes={
      progress:PropTypes.number.isRequired,
      isVisible:PropTypes.bool.isRequired,
  }

  render() {
    return (
        <Modal
          visible={this.props.isVisible}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => {
          }}
        >
          <View style={styles.container}>
            <View style={styles.showBg}>
              <Progress.Circle
                size={60}
                unfilledColor={'#ffffff'}
                borderColor={'#eaf1fb'}
                color={'#2fb9c3'}
                thickness={3}
                formatText={()=>{return `${this.props.progress}%`}}
                textStyle={{fontSize:12,fontWeight:'bold',color:'#568da8'}}
                showsText={true}
                progress={this.props.progress/100}/>
            </View>

          </View>
        </Modal>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'rgba(40,40,40,0.5)',
    justifyContent:'center',
    alignItems:"center"
  },
  showBg:{
    backgroundColor:'#ffffff',
    borderRadius:10,
    width:122,
    height:122,
    justifyContent:'center',
    alignItems:'center',
  }
});

