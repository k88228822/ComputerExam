import React from 'react';
import {InteractionManager, View, StyleSheet, Text, TouchableOpacity, Image} from "react-native";
import {NavigationActions}from 'react-navigation'
import {connect} from "react-redux";
import {createAction} from "../utils/index";
import ReturnButton from "../components/common/ReturnButton";
import MyTouch from "../components/common/MyTouch";
import MyStatusBar from "../components/common/MyStatusBar";
import HeadView from "../components/common/HeadView";
import MyListView from "../components/common/MyListView";
import BufferPage from "../components/common/BufferPage";
import ScreenSize from "../utils/index";

@connect(({offline}) => ({...offline}))
export default class Offline extends React.Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderHeaderLeft = this.renderHeaderLeft.bind(this);
    this.renderHeaderTitle = this.renderHeaderTitle.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(createAction('offline/getData')());
    })
  }

  //标题
  renderHeaderTitle() {
    return (
      <Text style={{fontWeight: 'bold'}}>{this.props.title}</Text>
    );
  }

  //标题返回
  renderHeaderLeft() {
    return (
      <ReturnButton onClick={()=>{this.props.dispatch(NavigationActions.back())}}/>
    );
  }

  onItemClick(rowData) {
    this.props.navigation.navigate('Test', {
      type: 'offline',
      directoryId: rowData.directoryId,
      subjectId: rowData.subjectId
    })
  }

  //渲染列表项
  renderRow(rowData, SectionID, rowID) {
    return (
      <View>
        <MyTouch style={styles.itemContainer} onPress={() => {
          this.onItemClick(rowData)
        }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={rowData.kind === 'EXAM' ? require('../images/search/real_test.png') : require('../images/search/simulation.png')}
              style={styles.itemImg}
            />
            <Text style={{fontSize: 13, marginLeft: 8, color: '#3c4a55'}}>{rowData.title}</Text>
          </View>
          <Image style={styles.titleImg} source={require('../images/main/rightgo.png')}/>
        </MyTouch>
        <View style={styles.bottomLine}/>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        <HeadView
          title={this.renderHeaderTitle}
          headLeft={this.renderHeaderLeft}
        />
        <View style={{height: 1, backgroundColor: '#eef1f6'}}/>
        <View style={{flex: 1}}>
          {
            this.props.show ?
              <MyListView
                dataSource={this.props.dataSource}
                renderRow={this.renderRow}
              />
              :
              <BufferPage style={{position: 'absolute', flex: 1, left: 0, top: 0}}/>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listView: {
    width: ScreenSize.width,
    paddingHorizontal: 12,
  },
  itemContainer: {
    height: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12
  },
  titleImg: {
    width: 6,
    height: 10,
    marginRight: 7,
  },
  bottomLine: {
    backgroundColor: '#eef1f6',
    height: 1,
    marginLeft: 12,
    marginRight: 7,
  },
  itemImg: {
    width: 32,
    height: 16,
  },

});

