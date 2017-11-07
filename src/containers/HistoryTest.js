/**
 * Created by wangzhen on 2017/11/6.
 */
import React from 'react';
import {StyleSheet,View} from "react-native";
import MyStatusBar from "../components/common/MyStatusBar";

class HistoryTest extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar/>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
})
export default HistoryTest;