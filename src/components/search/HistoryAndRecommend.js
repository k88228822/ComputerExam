/**
 * Created by wangzhen on 2017/10/26.
 */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types'

function HistoryAndRecommend(props) {
  return (
    <View>
      {
        props.historyData.length === 0 ? null :
          <View style={{marginHorizontal: 13}}>
            <Text style={styles.recommendTitle}>搜索历史</Text>
            <View style={styles.recommendContainer}>
              {
                props.historyData.map((item, index) => {
                  return (
                    <TouchableOpacity activeOpacity={1} style={styles.recommendItemContainer} key={index}>
                      <Text style={styles.recommendItem}>{item}</Text>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
          </View>
      }
      {
        props.recommendData.length === 0 ? null :
          <View style={{marginHorizontal: 13}}>
            <Text style={styles.recommendTitle}>推荐知识</Text>
            <View style={styles.recommendContainer}>
              {
                props.recommendData.map((item, index) => {
                  return (
                    <TouchableOpacity activeOpacity={1} style={styles.recommendItemContainer} key={index}>
                      <Text style={styles.recommendItem}>{item}</Text>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
          </View>
      }
    </View>
  );
}

HistoryAndRecommend.propTypes = {
  historyData: PropTypes.array,
  recommendData: PropTypes.array,
}

HistoryAndRecommend.defaultProps = {
  historyData: [],
  recommendData: [],
}

const styles = StyleSheet.create({
  recommendTitle: {
    marginTop: 20,
    fontSize: 12,
    color: '#3c4a55',
    marginBottom: 19,
  },
  recommendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  recommendItemContainer: {
    marginLeft: 7,
    height: 24,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dde0eb',
    marginBottom: 12,
  },
  recommendItem: {
    fontSize: 12,
    color: '#8a96b5',
  },

})


export default HistoryAndRecommend;