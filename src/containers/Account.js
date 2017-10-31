import React, {Component} from 'react'
import {StyleSheet, View, Image, Button, Text} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from '../utils'
import MyStatusBar from "../components/common/MyStatusBar";
import AccountList from "../components/account/AccountList";

const data = [
  {img: require('../images/account/money.png'), title: '待定'},
  {img: require('../images/account/share.png'), title: '分享'},
  {img: require('../images/account/abount.png'), title: '关于'},
  {img: require('../images/account/change.png'), title: '切换账号'},
]

@connect(state => ({...state.account}))
class Account extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
    this.onItemPress = this.onItemPress.bind(this);
  }

  onItemPress() {

  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar/>

        <Image style={styles.headStyle} source={require('../images/account/head.png')}/>

        <Text style={styles.headName}>{this.props.name}</Text>

        <AccountList data={data} onItemPress={this.onItemPress}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  headStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 48,
  },
  headName: {
    fontSize: 13,
    color: '#568da8',
    marginTop: 18,
    marginBottom: 54,
  },
})

export default Account
