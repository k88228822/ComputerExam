/**
 * Created by wangzhen on 2017/11/9.
 */
import React from 'react';
import MyListView from "../common/MyListView";
import PropType from 'prop-types';
import MyTouch from "../common/MyTouch";
import {StyleSheet,Image, Text, View} from "react-native";

function HistoryList(props) {

  function renderRow(rowData, SectionID, rowID) {
    return (
      <View>
        <MyTouch style={styles.itemContainer} onPress={() => {
          props.onItemClick(rowData, rowID);
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {
              rowData.isSelected ?
                <Image style={styles.itemDownloadImg} source={rowData.status === 'normal' ?
                  require('../../images/main/download.png')
                  :
                  require('../../images/main/downloaded.png')
                }/>
                : null
            }
            <Text style={{color: '#3c4a55', fontSize: 13, fontWeight: 'bold'}}>{rowData.title}</Text>
          </View>
          {
            rowData.isSelected ?
              null :
              <Image style={styles.titleImg} source={require('../../images/main/rightgo.png')}/>
          }
        </MyTouch>
        <View style={styles.bottomLine}/>
      </View>
    )
  }

  return (
    <MyListView
      dataSource={props.data}
      renderRow={renderRow}
    />
  );

}

HistoryList.propTypes = {
  data: PropType.array.isRequired,
  onItemClick:PropType.func.isRequired,
}

const styles=StyleSheet.create({
  bottomLine: {
    backgroundColor: '#eef1f6',
    height: 1,
  },
  itemContainer: {
    height: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleImg: {
    width: 6,
    height: 10,
    marginRight: 7,
  },
  itemDownloadImg: {
    width: 23,
    height: 23,
    resizeMode: 'center',
    marginRight: 8,
  }
})



export default HistoryList;