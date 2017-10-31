/**
 * Created by wangzhen on 2017/10/25.
 */
import React from 'react';
import {Modal} from "antd-mobile";
import PropTypes from 'prop-types'
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import ScreenSize, {System} from "../../utils/index";
import MyListView from "../common/MyListView";

function SelectModal(props) {

  function renderContent() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentHeadText}>
          <Text style={{fontSize: 15, color: '#3c4a55'}}>选择应考科目</Text>
        </View>
        <View style={{height: 600, marginTop: 47}}>
          <MyListView
            dataSource={props.listData}
            renderRow={renderRow}
          />
        </View>

        <TouchableOpacity style={styles.closeBtContainer} activeOpacity={1} onPress={() => {
          closeWindow();
        }}>
          <Image
            style={styles.closeBtStyle}
            source={require('../../images/select/btn_close.png')}
          />
        </TouchableOpacity>

      </View>
    );
  }

  function renderRow(data, sectionId, index) {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.listItemContainer}
                        onPress={() => props.onItemSelected(data.name, index)}>
        <Image source={data.img} style={styles.itemImage}/>
        <Text style={styles.itemText}>{data.name}</Text>
      </TouchableOpacity>
    );
  }


  // 关闭窗口
  function closeWindow() {
    props.onClose()
  }

  return (
    <Modal
      style={styles.modal}
      visible={props.visible}
      maskClosable={false}
    >
      <View style={styles.container} activeOpacity={1} focusedOpacity={1}>

        <ImageBackground style={styles.bgImg} source={require('../../images/select/bg_test.png')}>
          {renderContent()}
        </ImageBackground>
      </View>

    </Modal>
  );
}

SelectModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  listData: PropTypes.array,
  onItemSelected:PropTypes.func,
}
SelectModal.defaultProps = {
  listData: [],
  onItemSelected:(name,index)=>{}
}

const styles = StyleSheet.create({
  modal: {
    width: ScreenSize.width,
    height: ScreenSize.height,
  },
  container: {
    flex: 1,
    width: ScreenSize.width,
    height: ScreenSize.height,
    backgroundColor: 'rgba(255,255,255,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImg: {
    width: ScreenSize.width,
    height: ScreenSize.height,
  },
  contentContainer: {
    flex: 1,
  },
  contentHeadText: {
    width: ScreenSize.width,
    height: 38,
    marginTop: System.isIOS ? 20 : 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtContainer: {
    position: 'absolute',
    bottom: 27,
    left: 21,
  },
  closeBtStyle: {
    width: 48,
    height: 48,
  },
  listItemContainer: {
    width: ScreenSize.width,
    height: 35,
    flexDirection: 'row',
    marginLeft: 25,
    alignItems: 'center',
    marginBottom: 26,
  },
  itemImage: {
    width: 35,
    height: 35
  },
  itemText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#3c4a55'
  }
})

export default SelectModal;