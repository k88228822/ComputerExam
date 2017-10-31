import React, {Component, }from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
}from 'react-native';
import PropTypes from 'prop-types'
import ScreenSize from "../../utils/index";
import MyTouch from "../common/MyTouch";
export default class Page extends Component {

  static propTypes = {
    pageData: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      selectedNum: '-1',
      showAnswer: false,
    };
    this.renderAnswerDetail = this.renderAnswerDetail.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.renderSelectItem = this.renderSelectItem.bind(this);
  }

  componentDidMount() {

  }

  //答案解析
  renderAnswerDetail() {
    return (
      <View style={styles.answerContainer}>
        <View style={styles.rightAnswerHeadContainer}>
          <Text style={styles.rightAnswerHead}>正确答案</Text>
        </View>
        <View style={styles.rightDetailContainer}>
          <Text style={styles.detailSelect}>{this.props.pageData.right}</Text>
          {
            this.props.pageData.detail.isImg ?
              this.props.pageData.detail.imgUrl.map((uri, index) => {
                return (
                  <Image key={index} style={styles.detailImg} source={{uri: uri}}/>
                );
              })
              :
              this.props.pageData.detail.text.map((item, index) => {
                return (<Text key={index} style={styles.detailContent}>{item}</Text>);
              })
          }
        </View>
      </View>
    );
  }

  //选项点击事件
  onItemClick(item) {
    this.setState({
      selectedNum: Object.keys(item)[0],
    });
    this.props.onItemClick(Object.keys(item)[0]===this.props.pageData.right);

  }

  //选项界面
  renderSelectItem(item, index) {
    let bgColor = '#cccccc';
    if (this.props.pageData.showAnswer) {
      if (this.state.selectedNum === Object.keys(item)[0] && Object.keys(item)[0] !== this.props.pageData.right) {
        bgColor = '#e21d07'
      } else if (Object.keys(item)[0] === this.props.pageData.right) {
        bgColor = '#26b461'
      }
    }
    return (
      <MyTouch key={index} onPress={() => {
        this.onItemClick(item)
      }} style={index % 2 === 0 ? styles.selectItemContainer1 : styles.selectItemContainer2}>
        <View style={[styles.selectNumContainer, {backgroundColor: bgColor}]}>
          <Text style={{fontSize: 13, color: '#ffffff',}}>{Object.keys(item)[0]}</Text>
        </View>
        <Text style={styles.selectItemTitle1}>{Object.values(this.props.pageData.select[index])[0]}</Text>
      </MyTouch>
    );
  }


  //题目
  renderSubject() {
    return (
      <View style={styles.subjectContainer}>
        {
          this.props.pageData.content.isImg ?
            this.props.pageData.content.imgUrl.map((item, index) => {
              return (
                <Image key={index} style={styles.timu} source={{uri: item}}/>
              );
            })
            :
            this.props.pageData.content.text.map((item, index) => {
              return (
                <Text key={index} style={styles.subjectText}>{item}</Text>
              );
            })
        }
      </View>
    );
  }

  //主界面
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {
          this.renderSubject()
        }
        {
          this.props.pageData.select.map((item, index) => {
            return (this.renderSelectItem(item, index));
          })
        }
        {
          this.props.pageData.showAnswer ?
            this.renderAnswerDetail() :
            <View style={styles.answerContainer}/>
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  timu: {
    resizeMode: Image.resizeMode.contain,
    width: ScreenSize.width,
    height: ScreenSize.width/3,
    backgroundColor: '#ffffff',
  },
  selectItemContainer1: {
    height: 49,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  selectItemContainer2: {
    height: 49,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  selectItemTitle1: {
    fontSize: 13,
    color: '#3c4a55',
    marginLeft: 15,
  },
  selectItemImg: {
    marginLeft: 17,
    width: 23,
    height: 23,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    flexShrink: 1,
  },
  answerContainer: {
    marginLeft: 8,
    width: ScreenSize.width - 24,
    marginTop: 12
  },
  rightAnswerHeadContainer: {
    backgroundColor: '#e21d07',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: 75,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAnswerHead: {
    color: '#ffffff',
    fontSize: 13,
  },
  rightDetailContainer: {
    borderWidth: 2,
    borderColor: '#e21d07',
    padding: 12,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  selectNumContainer: {
    marginLeft: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailSelect: {
    color: '#26b461',
    fontSize: 17,
  },
  detailContent: {
    marginTop: 5,
    color: '#3c4a55',
    fontSize: 11,
    lineHeight: 18,
  },
  detailImg: {
    width: 316,
    height: 105,
    resizeMode: 'contain'
  },
  subjectContainer: {
    width: ScreenSize.width,
    marginTop: 10,
    marginBottom: 10,
  },
  subjectText: {
    marginLeft: 12,
    fontSize: 13,
    color: '#3c4a55',
    marginBottom: 8,
    fontWeight: 'bold',
  },


})
