/**
 * Created by wangzhen on 2017/10/23.
 */
import React from 'react';
import {Platform, View, StyleSheet, TouchableOpacity} from "react-native";
import ScreenSize from "../../utils/index";
import PropTypes from 'prop-types'


function HeadView(props) {

  function onlyShowTitle() {
    return props.headLeft === undefined && props.headerRight === undefined
  }

  function renderOnlyTitle() {
    return (
      <View style={styles.container}>
        {props.title()}
      </View>
    )
  }

  function renderNormal() {
    return (
      <View style={styles.container}>
        {
          <TouchableOpacity activeOpacity={1} style={styles.leftView} onPress={() => {
            props.onLeftPress !== undefined ? props.onLeftPress() : null
          }}
          >
            {
              props.headLeft === undefined ?
                null :
                props.headLeft()
            }
          </TouchableOpacity>
        }
        {
          props.title()
        }
        {
          <TouchableOpacity activeOpacity={1} style={styles.rightView} onPress={() => {
            props.onRightPress !== undefined ? props.onRightPress() : null
          }}>
            {
              props.headerRight === undefined ?
                null :
                props.headerRight()
            }
          </TouchableOpacity>
        }
      </View>
    )

  }

  return (
    <View>
      {
        onlyShowTitle() ?
          renderOnlyTitle() :
          renderNormal()
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: ScreenSize.width,
    height: Platform.OS === 'ios' ? 56 : 66,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 20 : 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftView: {
    width: 56,
    height: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },

  rightView: {
    width: 56,
    height: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

});

HeadView.propTypes = {
  headLeft: PropTypes.func,
  title: PropTypes.func.isRequired,
  headerRight: PropTypes.func,
  onLeftPress: PropTypes.func,
  onRightPress: PropTypes.func,
}


export default HeadView;