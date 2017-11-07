/**
 * Created by wangzhen on 2017/11/6.
 */
import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";

function AnswerCardFillBlank() {
  return (
    <View style={styles.groupContainer}>
      <Text style={styles.selectTitle}>填空题</Text>
      <View style={styles.selectContainer}>
        {
          this.props.data.array.map((temp, index) => {
            if (index >= this.props.data.one && index < this.props.data.two) {
              let bgColor = temp.status === 1 ? '#51c280' : temp.status === 2 ? '#f35f45' : '#ffffff';
              if (this.props.currentNum === index + 1) bgColor = '#dbdbdb';
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.onItemSelected(index)
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

export default AnswerCardFillBlank;