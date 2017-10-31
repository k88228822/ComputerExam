/**
 * Created by wangzhen on 2017/10/27.
 */
import React from 'react';
import {LayoutAnimation,Platform,UIManager,Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types'
import MyTouch from "../common/MyTouch";

class ListItem extends React.Component {
  static propTypes = {
    rowData: PropTypes.object,
    rowID: PropTypes.string,
    onItemClick: PropTypes.func
  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      show:false,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.renderTitle=this.renderTitle.bind(this);
    this.renderRow=this.renderRow.bind(this);
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  renderTitle(){
   return(
     <TouchableOpacity activeOpacity={1} style={styles.titleContainer} onPress={() => {
       this.setState({show: !this.state.show})
     }}>
       <Text style={styles.titleText}>{this.props.rowData.chapter.title}</Text>
       {
         this.state.show ?
           <Image style={styles.titleImg} source={require('../../images/offical/up.png')}/>
           :
           <Image style={styles.titleImg} source={require('../../images/offical/down.png')}/>
       }
     </TouchableOpacity>
   )
  }

  renderRow(data, id) {
    return (
      <MyTouch key={id} style={styles.itemContainer} onPress={
        () => {
          this.props.onItemClick(this.props.rowData.chapter.subjectId, data.id)
        }
      }>
        <Text style={{fontSize: 13, color: '#626b81'}}>{data.title}</Text>
      </MyTouch>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTitle()}
        <View style={styles.bottomLine}/>
        {
          this.state.show ?
            this.props.rowData.directoryList.map((item, index) => {
              return (
                this.renderRow(item, index)
              );
            })
            :
            null
        }

        {
          this.state.show ?
            <View style={styles.bottomLine}/>
            : null
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listview: {
    marginHorizontal: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
  },
  titleImg: {
    width: 12,
    height: 7,
    marginRight: 7,
  },
  titleText: {
    fontSize: 13,
    color: '#3c4a55',
    fontWeight: 'bold',
  },
  bottomLine: {
    backgroundColor: '#eef1f6',
    height: 1,
  },
  itemContainer: {
    height: 43,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },

})

export default ListItem;