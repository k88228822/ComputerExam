import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  LayoutAnimation,
  UIManager, TouchableOpacity,
} from 'react-native';
import ScreenSize from "../../utils/index";
import PropTypes from 'prop-types'

export default class ListItem extends React.Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    rowID:  PropTypes.string.isRequired
  }

// 构造
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    // 初始状态
    this.state = {
      show: false
    };
    this.renderDetail=this.renderDetail.bind(this)
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  renderDetail() {
    if (this.state.show) {
      return (
        <TouchableOpacity activeOpacity={1} onPress={() => {
          this.setState({show: false})
        }
        }>
          <Text style={styles.detailText}>{this.props.rowData.content}</Text>
          <View style={styles.detailContainer} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 11, color: '#c1c6cb'}}>收起</Text>
              <Image style={styles.downImg} source={require('../../images/offical/up.png')}/>
              <View style={{flex:1,justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize: 11, color: '#c1c6cb'}}>{this.props.rowData.origin}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity activeOpacity={1} style={styles.detailContainer} onPress={() => {
          this.setState({
            show: true
          })
        }
        }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 11, color: '#c1c6cb'}}>展开</Text>
            <Image style={styles.downImg} source={require('../../images/offical/down.png')}/>
            <View style={{flex:1,justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>
              <Text style={{fontSize: 11, color: '#c1c6cb'}}>{this.props.rowData.origin}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }


  render() {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.container} onPress={()=>{this.setState({show:true});}}>
        <Text style={styles.time}>{this.props.rowData.time}</Text>
        <View>
          <Text style={styles.title}>{this.props.rowData.title}</Text>
          {this.renderDetail()}
        </View>
        <View style={styles.bottomLine}/>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 22,
  },
  time: {
    fontSize: 11,
    color: '#8f99a3',
    width: 49,
    marginTop:1,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    color: '#3c4a55',
    width:ScreenSize.width-66,
    fontWeight:'bold',
    lineHeight:17,
  },
  detailContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    color: '#6a6e74',
    width:280,
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 1,
    backgroundColor: '#eef1f6',
    width:ScreenSize.width-66,
    marginLeft:49,
    marginRight:17,
  },
  downImg: {
    width: 12,
    height: 7,
    marginLeft: 6,
  },
  detailText:{
    marginTop:15,
    width:ScreenSize.width-66,
    fontSize:13,
    lineHeight:21,
    color:'#2c333f'
  }

});

