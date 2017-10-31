import React from 'react';
import {InteractionManager, UIManager, Platform, Text, View, StyleSheet, Image} from "react-native";
import {connect} from "react-redux";
import {createAction} from "../utils/index";
import MyStatusBar from "../components/common/MyStatusBar";
import HeadView from "../components/common/HeadView";
import MyListView from "../components/common/MyListView";
import ListItem from "../components/official/ListItem";

@connect(({official}) => ({...official}))
export default class Official extends React.Component {

  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.onRefresh = this.onRefresh.bind(this);
    this.renderHeadTitle = this.renderHeadTitle.bind(this);
    this.renderHeadLeft = this.renderHeadLeft.bind(this);
    this.onSpreadClick = this.onSpreadClick.bind(this);
    this.renderRow=this.renderRow.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(createAction('official/getData')())
    });
  }

  renderHeadTitle() {
    return (
      <Text style={{fontWeight: 'bold'}}>官方资讯</Text>
    );
  }

  renderHeadLeft() {
    return (
      <Image
        style={styles.headLogoStyle}
        source={require('../images/main/logo.png')}
      />
    );
  }

  onRefresh() {

  }

  onSpreadClick() {

  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <ListItem rowData={rowData} rowID={rowID}/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar/>

        <HeadView
          title={this.renderHeadTitle}
          headLeft={this.renderHeadLeft}
        />

        <MyListView
          style={styles.listView}
          dataSource={this.props.data}
          renderRow={this.renderRow}
          onRefresh={this.onRefresh}
          refresh={this.props.refreshing}
          initialListSize={20}
          removeClippedSubviews={false}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  headLogoStyle: {
    width: 41,
    height: 24,
    marginLeft: 15,
  },
  listView: {
    flex: 1,
  },
  icon:{
    width:20,
    height:20
  }
});

