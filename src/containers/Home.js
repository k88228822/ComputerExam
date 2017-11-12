import React, { Component } from 'react'
import {InteractionManager,StyleSheet, View, Image, Button, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from '../utils'
import MyStatusBar from "../components/common/MyStatusBar";
import HomeHead from "../components/home/HomeHead";
import {createAction} from "../utils/index";
import Swiper from "../components/home/Swiper";
import HomeGridView from "../components/home/HomeGridView";
import SelectModal from "../components/home/SelectModal";
import LocalStorage from "../common/LocalStorage";
import {STORAGE_SELECT_NAME} from "../common/Constants";
import ScreenSize from "../utils/index";

const itembgs = [
  require('../images/question/exercise.png'),
  require('../images/question/historytopic.png'),
  require('../images/question/simulatedtest.png'),
  require('../images/question/offlinedatabase.png'),
  require('../images/question/errorcollection.png'),
  require('../images/question/testcollection.png'),
  require('../images/question/rank.png'),
  require('../images/question/searchResult.png'),
];

@connect(state=>({...state.home}))
class Home extends Component {
  static navigationOptions = {
    tabBarLabel: '题库',
    tabBarIcon: ({ focused, tintColor }) =>
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/main/questions_bank.png')}
      />,
  }

  // 构造
  constructor(props) {
    super(props);
    this.onHeaderRightPress = this.onHeaderRightPress.bind(this);
    this.onContentItemClick=this.onContentItemClick.bind(this);
    this.onSelectModalClose=this.onSelectModalClose.bind(this);
    this.onModalItemSelected=this.onModalItemSelected.bind(this);
  }

  //点击菜单选项
  onHeaderRightPress() {
    this.props.dispatch(createAction('home/setSelectModalVisible')({visible:true}))
  }

  //内容选择
  onContentItemClick(index){
    switch (index) {
      case 0://教材章节习题
        this.props.navigation.navigate('BookExercise')
        break;
      case 1://历年真题汇总
        this.props.navigation.navigate(
          'HistoryTest', {
            isSubject: true,
          }
        );
        break;
      case 2://最新机考模拟题
        this.props.navigation.navigate(
          'HistoryTest', {
            isSubject: false
          }
        );
        break;
      case 3://离线题库
        this.props.navigation.navigate(
          'Offline',
        );
        break;
      case 4://错题集
        this.props.navigation.navigate(
          'Test', {
            type: 'wrong'
          }
        );
        break;
      case 5://试题收藏
        this.props.navigation.navigate(
          'Test',
          {type: 'collect'}
        );
        break;
      case 6://榜上有名
        this.props.navigation.navigate(
          'Rank',
        );
        break;
      case 7://试题收藏
        this.props.navigation.navigate(
          'Wrong',
        );
        break;
      default:
        break;
    }
  }

  //关闭选择界面
  onSelectModalClose(){
    this.props.dispatch(createAction('home/setSelectModalVisible')({visible:false}))
  }

  // 选择列表后返回
  onModalItemSelected(data, index) {
    this.props.dispatch(createAction('home/setSelectModalVisible')({visible:false}))
    this.props.dispatch(createAction('home/setSubject')({data, index}));
  }


  componentDidMount() {
    InteractionManager.runAfterInteractions(()=>{
      this.props.dispatch(createAction('home/getDays')())
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <MyStatusBar/>

        <HomeHead
          title={this.props.title}
          onHeaderRightPress={this.onHeaderRightPress}
        />

        {/*<ScrollView*/}
          {/*removeClippedSubviews={false}*/}
          {/*showsVerticalScrollIndicator={false}*/}
          {/*style={styles.container}>*/}

          <Swiper urls={this.props.urls}/>

          <HomeGridView
            data={itembgs}
            time={this.props.time}
            columnNum={3}
            onItemClick={this.onContentItemClick}
          />

        {/*</ScrollView>*/}

        <SelectModal
          onClose={this.onSelectModalClose}
          visible={this.props.selectModelVisible}
          listData={this.props.selectData}
          onItemSelected={this.onModalItemSelected}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    height:ScreenSize.height,
},
  icon: {
    width: 20,
    height: 20,
  },
})

export default Home
