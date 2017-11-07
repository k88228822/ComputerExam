import React from 'react';
import { View} from "react-native";
import PropTypes from 'prop-types'
import Page from "./Page";

var ScrollableTabView = require('react-native-scrollable-tab-view');


class Content extends React.Component {
  static propTypes = {
    onPageChanged: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    dataSource: PropTypes.array.isRequired,
    pageNum: PropTypes.number
  }
  static defaultProps = {
    pageNum: 0,
  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
    this.renderPage=this.renderPage.bind(this);
    this.goToPage=this.goToPage.bind(this);
  }

  renderPage(item, index) {
    return (
      <Page
        key={index}
        pageData={item}
        onItemClick={this.props.onItemClick}
      />
    )
  }

  goToPage(pageNum){
    this.scrollView.goToPage(pageNum);
  }

  render() {
    return (
      <ScrollableTabView
        ref={e => this.scrollView = e}
        onChangeTab={({i, ref, from}) => {
          this.props.onPageChanged(i)
        }}
        tabBarPosition='bottom'
        scrollWithoutAnimation={true}
        tabBarUnderlineStyle={{height: 1}}
        prerenderingSiblingsNumber={2}
        renderTabBar={() => {
          return (<View></View>)
        }}
      >
        {
          this.props.dataSource.map((data, index) => {
            return (this.renderPage(data, index))
          })
        }
      </ScrollableTabView>
    );
  }
}


export default Content;