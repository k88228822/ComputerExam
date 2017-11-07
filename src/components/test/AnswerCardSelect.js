/**
 * Created by wangzhen on 2017/11/6.
 */
import React from 'react';
import {StyleSheet,Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';


function AnswerCardSelect(props) {

  //选择题界面
  function renderSelect() {

    return (
      <View style={styles.groupContainer}>
        <Text style={styles.selectTitle}>选择题</Text>
        <View style={styles.selectContainer}>
          {
            props.data.array.map((temp, index) => {
              if (index < props.data.one) {
                let bgColor = temp.status === 1 ? '#51c280' : temp.status === 2 ? '#f35f45' : '#ffffff';
                if (props.currentNum === index + 1) bgColor = '#dbdbdb';
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.onItemSelected(index)
                    }}
                    activeOpacity={1}
                    style={[styles.itemContainer, {backgroundColor: bgColor}]}
                    key={index}>
                    <Text style={styles.itemText}>{index + 1}</Text>
                  </TouchableOpacity>
                );
              }
            })
          }
        </View>
      </View>
    );
  }

  //填空题界面
  function renderFillBlank() {
    return (
      <View style={styles.groupContainer}>
        <Text style={styles.selectTitle}>填空题</Text>
        <View style={styles.selectContainer}>
          {
            props.data.array.map((temp, index) => {
              if (index >= props.data.one && index < props.data.two) {
                let bgColor = temp.status === 1 ? '#51c280' : temp.status === 2 ? '#f35f45' : '#ffffff';
                if (props.currentNum === index + 1) bgColor = '#dbdbdb';
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.onItemSelected(index)
                    }}
                    activeOpacity={1}
                    style={[styles.itemContainer, {backgroundColor: bgColor}]}
                    key={index}>
                    <Text style={styles.itemText}>{index + 1}</Text>
                  </TouchableOpacity>
                );
              }
            })
          }
        </View>
      </View>
    );
  }

  return (
    <View>
      {renderSelect()}
      {renderFillBlank()}
    </View>
  );
}

AnswerCardSelect.propTypes={
  currentNum:PropTypes.number,
  onItemSelected:PropTypes.func.isRequired,
  data:PropTypes.object.isRequired,
}

AnswerCardSelect.defaultProps={

}

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 10,

  },
  itemContainer: {
    width: 43,
    height: 43,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
    marginBottom: 16,
  },
  groupContainer: {
    paddingRight: 16,
  },
  selectTitle: {
    fontSize: 13,
    color: '#3c4a55',
    marginLeft: 14,
    marginVertical: 11,
  },
  itemText: {
    fontSize: 16,
    color: '#3c4a55',
  },

})


export default AnswerCardSelect;