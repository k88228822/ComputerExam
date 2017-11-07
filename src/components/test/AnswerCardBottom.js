/**
 * Created by wangzhen on 2017/11/7.
 */
import React from 'react';
import {StyleSheet,Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';

const types = [
  {text: '对', color: '#26b461'},
  {text: '错', color: '#e21d07'},
  {text: '未做', color: '#ffffff'},
  {text: '当前题', color: '#dbdbdb'},
];

function AnswerCardBottom(props) {
  return (
    <View style={styles.bottomContainer}>
      <View style={{flexDirection: 'row'}}>
        {
          types.map((item, index) => {
            return (
              <View key={index} style={styles.bottomDetail}>
                <View style={[styles.bottomDetailImg, {backgroundColor: item.color}]}/>
                <Text style={styles.bottomDetailText}>{item.text}</Text>
              </View>
            );
          })
        }
      </View>

      <View style={{flexDirection: 'row', height: 43}}>
        <TouchableOpacity
          onPress={() => {
            props.onReStartPress()
          }}
          activeOpacity={1}
          style={[styles.bottomButton, {backgroundColor: '#f79300'}]}>
          <Text style={styles.textStyle}>重新开始</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.onClose()
          }}
          style={[styles.bottomButton, {backgroundColor: '#f64f00'}]}>
          <Text style={styles.textStyle}>继续做题</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
AnswerCardBottom.propTypes={
  onReStartPress:PropTypes.func.isRequired,
  onClose:PropTypes.func.isRequired,
}

AnswerCardBottom.defaultProps={
}

const styles=StyleSheet.create({
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  bottomButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 15,
    color: '#ffffff',
  },
  bottomDetail: {
    flexDirection: 'row',
    marginLeft: 16,
    borderRadius: 2,
    marginBottom: 7,
  },
  bottomDetailImg: {
    width: 11,
    height: 11,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  bottomDetailText: {
    marginLeft: 6,
    fontSize: 10,
    color: '#3c4a55',
  }
})

export default AnswerCardBottom;