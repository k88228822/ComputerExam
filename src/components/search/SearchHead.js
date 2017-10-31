/**
 * Created by wangzhen on 2017/10/26.
 */
import React from 'react';
import {TouchableOpacity,Image, StyleSheet, TextInput, View} from "react-native";
import PropTypes from 'prop-types';

class SearchHead extends React.Component {

  static propTypes = {
    onChangeText: PropTypes.func,
    onEndEditing: PropTypes.func,
    searchText: PropTypes.string
  }

  static defaultProps = {
    onChangeText: () => {
    },
    onEndEditing: () => {
    },
    searchText: '',
  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      clearVisible: false,
      searchText: '',
    };
    this.onChangeText=this.onChangeText.bind(this)
    this.onEndEditing=this.onEndEditing.bind(this);
    this.onCLearOnClick=this.onCLearOnClick.bind(this);
  }

  onChangeText(text) {
    text.length === 0 ?
      this.setState({
        clearVisible:false,
        searchText:'',
      })
      :
      this.setState({
        clearVisible: true,
        searchText: text,
      });

    this.props.onChangeText(text)
  }

  onEndEditing() {
    this.props.onEndEditing();
  }

  onCLearOnClick(){
     this.setState({
       searchText:'',
       clearVisible:false,
     })
    this.props.onChangeText('')
  }

  render() {
    return (
      <View style={styles.titleContainer}>
        <Image style={styles.searchImage} source={require('../../images/search/search_img.png')}/>

        <TextInput
          style={styles.searchText}
          placeholder={'请输入搜索内容'}
          placeholderTextColor={'#8891a7'}
          autoCorrect={false}
          autoFocus={false}
          underlineColorAndroid={'transparent'}
          onChangeText={this.onChangeText}
          onEndEditing={this.onEndEditing}
          value={this.state.searchText}
        />

        {
          this.state.clearVisible ?
            <TouchableOpacity activeOpacity={1} onPress={this.onCLearOnClick}>
              <Image
                resizeMode={'contain'} style={styles.clearImg}
                source={require('../../images/search/clear.png')}
              />
            </TouchableOpacity>
            :
            <View style={styles.clearImg}/>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({

  titleContainer: {
    flex: 1,
    height: 32,
    backgroundColor: '#f2f4f7',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 12,
    marginHorizontal: 13,
  },
  searchImage: {
    width: 13,
    height: 13,
    marginLeft: 16,
    resizeMode: 'contain',
  },
  clearImg: {
    width: 13,
    height: 13,
    marginRight: 16,
  },
  searchText: {
    flex: 1,
    padding: 0,
    fontSize: 11,
    color: '#8891a7',
    marginLeft: 10,
  },

})
export default SearchHead;