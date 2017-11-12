import React from 'react';
import {StyleSheet, Image, View, ScrollView} from "react-native";
import PropTypes from 'prop-types'
import ScreenSize from "../../utils/index";
var ScrollableTabView = require('react-native-scrollable-tab-view');
const pointRadious=7;


class Content extends React.Component {
  static propTypes = {
    imageUrls: PropTypes.array.isRequired,
  }
  static defaultProps = {
    pageNum: 0,
  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      currentPage:0,
    };
    this.renderPage=this.renderPage.bind(this);
    this.onPageChanged=this.onPageChanged.bind(this);
    this.onScroll=this.onScroll.bind(this);
  }

  renderPage(item, index) {
    return (
      <Image
        key={index}
        style={styles.bannerImageStyle}
        resizeMode={'stretch'}
        source={{uri: item}}
      />
    )
  }

  onPageChanged(index){

  }

  onScroll(e) {
    let x = e.nativeEvent.contentOffset.x;
    let currentPage = Math.round(x / ScreenSize.width);

    if (this.state.currentPage != currentPage) {
      this.setState({
        currentPage: currentPage
      })
    }
  }

  render() {
    let menuViews = []

    for (let i = 0; i < this.props.imageUrls.length; i++) {
      menuViews.push(this.renderPage(this.props.imageUrls[i],i))
    }

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onScroll={(e) => this.onScroll(e)}
        >
          <View style={styles.menuContainer}>
            {menuViews}
          </View>
        </ScrollView>
        <View style={styles.pointContainer}>
          {
            this.props.imageUrls.map((item,index)=>{
              return(<View key={index} style={[styles.point,{backgroundColor:this.state.currentPage===index? '#324855':'#eeeeee'}]}/>)
            })
          }
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height:160,
    width:ScreenSize.width,
  },
  contentContainer: {
  },
  menuContainer: {
    flexDirection: 'row',
  },
  bannerImageStyle: {
    width: ScreenSize.width,
    height: 160,
    backgroundColor: '#ffffff',
  },
  pointContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf:'center',
    flexDirection:'row',
  },
  point: {
    width: pointRadious,
    height: pointRadious,
    borderRadius: pointRadious/2,
    backgroundColor: '#eeeeee',
    marginHorizontal:pointRadious/1.5,
  },

})


export default Content;