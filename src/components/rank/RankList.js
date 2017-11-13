/**
 * Created by wangzhen on 2017/11/9.
 */
import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import MyListView from "../common/MyListView";
import PropType from 'prop-types';

const rankImg = [
  require('../../images/ranklist/rank_first.png'),
  require('../../images/ranklist/rank_second.png'),
  require('../../images/ranklist/rank_third.png')
]

function RankList(props) {

  function renderRow(rowData, sectionId, rowId) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.rowLeftContainer}>
          {
            rowId < 3 ?
              <Image style={styles.rankImg} source={rankImg[rowId]}/>
              :
              <Text
                style={{width: 20, textAlign: 'center', fontSize: 16, color: '#000000'}}>{parseInt(rowId) + 1}</Text>
          }
        </View>
        <View style={{flex: 1}}>
          <View style={styles.rowRightContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Image style={styles.titleImg} source={rowData.headerUrl}/>
              <Text style={styles.rowName}>{rowData.name}</Text>
              <Image
                style={styles.sexImg}
                source={rowData.sex === 'male' ?
                  require('../../images/ranklist/boy_img.png')
                  : require('../../images/ranklist/girl_img.png')}
              />
            </View>
            <Text
              style={[styles.rowName, {color: rowId < 3 ? '#ff0000' : '#3c4a55'}]}>
              {`${rowData.num} 题`}</Text>
          </View>

          <View style={{backgroundColor: '#eef1f6', height: 1}}/>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.listContainer}>
      <View style={{backgroundColor: '#eef1f6', height: 1}}/>
      <MyListView
        dataSource={props.dataSource}
        renderRow={renderRow}
        showRefresh={false}
      />
    </View>
  );
}

RankList.propTypes={
  dataSource:PropType.array.isRequired,
}

const styles=StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 14,
  },
  titleImg: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  rowContainer: {
    flex: 1,
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRightContainer: {
    flex: 1,
    height: 67,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sexImg: {
    width: 9,
    height: 12,
    marginLeft: 8,
  },
  rankImg: {
    width: 20,
    height: 32,
  },
  rowLeftContainer: {
    width: 44,
    paddingRight: 10,
    justifyContent: 'center',
  },
  rowName: {
    marginLeft: 13,
    fontSize: 13,
    color: '#3c4a55'
  },

})
export default RankList;