import React from 'react';
import {InteractionManager, StyleSheet, View} from "react-native";
import MyStatusBar from "../components/common/MyStatusBar";
import Head from "../components/bookExercise/Head";
import {connect} from "react-redux";
import {NavigationActions} from '../utils'
import BufferPage from "../components/common/BufferPage";
import {createAction} from "../utils/index";
import ContentList from "../components/bookExercise/ContentList";
import ScreenSize from "../utils/index";

@connect(state => ({...state.bookExercise}))
class BookExercise extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(createAction('bookExercise/getOfficialBook')())
    })
  }

  onItemClick(subjectId, directoryId) {
    this.props.navigation.navigate('Test', {
      type: 'exercise',
      subjectId,
      directoryId
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <MyStatusBar/>

        <Head
          title={this.props.title}
          onReturnClick={() => {
            this.props.dispatch(NavigationActions.back())
          }}/>

        <View style={{height: 1, backgroundColor: '#eef1f6'}}/>
        <View style={{flex: 1}}>
          {
            !this.props.show ?
              <BufferPage/>
              :
              <View style={{paddingHorizontal: 12}}>
                <ContentList
                  listData={this.props.listData}
                  onItemClick={this.onItemClick}
                />
              </View>
          }
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listView: {
    position: 'absolute',
    width: ScreenSize.width,
  },
  returnImg: {
    width: 10,
    height: 16,
  }
});

export default BookExercise;