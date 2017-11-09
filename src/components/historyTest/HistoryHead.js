/**
 * Created by wangzhen on 2017/11/9.
 */
import React from 'react';
import {StyleSheet,Text, View} from "react-native";
import HeadView from "../common/HeadView";
import ReturnButton from "../common/ReturnButton";
import MyTouch from "../common/MyTouch";
import {NavigationActions} from 'react-navigation'
import PropType from 'prop-types';

class HistoryHead extends React.Component{
    // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        download:false,
      };
      this.renderHeaderTitle=this.renderHeaderTitle.bind(this);
      this.renderHeaderLeft=this.renderHeaderLeft.bind(this);
      this.renderHeaderRight=this.renderHeaderRight.bind(this);
      this.onDownloadPress=this.onDownloadPress.bind(this);
    }

    static propTypes={
        onDownPress:PropType.func.isRequired,
        title:PropType.string.isRequired,
        onReturnPress:PropType.func.isRequired,
    }

  //标题
  renderHeaderTitle() {
    return (
      <Text style={{fontWeight: 'bold'}}>{this.props.title}</Text>
    );
  }

  //标题返回
  renderHeaderLeft() {
    return (
      <ReturnButton onClick={this.props.onReturnPress}/>
    );
  }

  //标题下载
  renderHeaderRight() {
    return (
      <MyTouch
        onPress={this.onDownloadPress}
      >
        <Text style={styles.headerRightTitle}>{this.state.download ? '取消' : '下载'}</Text>
      </MyTouch>
    );
  }

  onDownloadPress(){
    this.setState({
      download: !this.state.download,
    });
    this.props.onDownPress();
  }

  render(){
       return(
         <HeadView
           title={this.renderHeaderTitle}
           headLeft={this.renderHeaderLeft}
           headerRight={this.renderHeaderRight}
         />
       )
  }
}
const styles =StyleSheet.create({
  headerRightTitle: {
    fontSize: 13,
    color: '#568da8',
    marginRight: 18,
    marginVertical:10,
    marginLeft:10,
  },

})

export default HistoryHead;