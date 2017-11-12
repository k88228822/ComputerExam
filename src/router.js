import React, {PureComponent} from 'react'
import {BackHandler, Animated, Easing} from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'
import {connect} from 'react-redux'

import Login from './containers/Login'
import Home from './containers/Home'
import Account from './containers/Account'
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import Official from "./containers/Official";
import TabBarItem from "./components/common/TabBarItem";
import Search from "./containers/Search";
import BookExercise from "./containers/BookExercise";
import Test from "./containers/Test";
import HistoryTest from "./containers/HistoryTest";
import Offline from "./containers/Offline";
import Rank from "./containers/Rank";
import AnswerCard from "./components/test/AnswerCard";

const BankIcon = require('./images/main/questions_bank.png');
const BankSelectedIcon = require('./images/main/questions_bank_selected.png');
const OfficialIcon = require('./images/main/official.png');
const OfficialIconSelected = require('./images/main/official_selected.png');
const SearchIcon = require('./images/main/search.png');
const SearchIconSelected = require('./images/main/search_selected.png');
const AccountIcon = require('./images/main/account.png');
const AccountIconSelected = require('./images/main/account_selected.png');

const TabOptions = (tabBarTitle, normalImage, selectedImage) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = (({focused}) => {
    return (
      <TabBarItem
        focused={focused}
        normalImage={normalImage}
        selectedImage={selectedImage}
      />
    );
  });
  return {tabBarLabel, tabBarIcon};
};

const HomeNavigator = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => TabOptions('题库', BankIcon, BankSelectedIcon),
    },
    Official: {
      screen: Official,
      navigationOptions: () => TabOptions('官方', OfficialIcon, OfficialIconSelected),
    },
    Search: {
      screen: Search,
      navigationOptions: () => TabOptions('搜索', SearchIcon, SearchIconSelected),
    },
    Account: {
      screen: Account,
      navigationOptions: () => TabOptions('账号', AccountIcon, AccountIconSelected),
    },
  },
  {
    animationEnabled: true, // 切换页面时是否显示动画
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, //左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    // mode: 'card',
    tabBarOptions: {
      activeTintColor: '#3c4a55', // 文字和图片选中颜色
      inactiveTintColor: '#505c65', // 文字和图片默认颜色
      showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
      indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
      // tabbar的style
      style: {
        height: 48,
        backgroundColor: '#ffffff', // TabBar 背景色
      },
      // // tabbar上label的style
      labelStyle: {
        fontSize: 9, // 文字大小
        // marginTop: 0,
      },
      // tabbar的iconstyle
      iconStyle: {
        marginBottom: 1,
        marginTop: 0,
        width:50,
      },
    }
  }
)

// const MainNavigator = StackNavigator(
//   {
//     HomeNavigator: {screen: HomeNavigator},
//   },
//   {
//     headerMode: 'none',
//     mode: 'modal',
//     navigationOptions: {
//       gesturesEnabled: false,
//     },
//     transitionConfig: () => ({
//       transitionSpec: {
//         duration: 300,
//         easing: Easing.out(Easing.poly(4)),
//         timing: Animated.timing,
//       },
//       screenInterpolator: sceneProps => {
//         const {layout, position, scene} = sceneProps
//         const {index} = scene
//
//         const height = layout.initHeight
//         const translateY = position.interpolate({
//           inputRange: [index - 1, index, index + 1],
//           outputRange: [height, 0, 0],
//         })
//
//         const opacity = position.interpolate({
//           inputRange: [index - 1, index - 0.99, index],
//           outputRange: [0, 1, 1],
//         })
//
//         return {opacity, transform: [{translateY}]}
//       },
//     }),
//   }
// )

const AppNavigator = StackNavigator(
  {
    Main: {screen: HomeNavigator},
    Login: {screen: Login},
    BookExercise: {screen: BookExercise},
    Test:{screen:Test},
    HistoryTest:{screen:HistoryTest},
    Offline:{screen:Offline},
    Rank:{screen:Rank},
    AnswerCard:{screen:AnswerCard},
  },
  {
    headerMode: 'none',
    // mode: 'card',
    navigationOptions: {
      gesturesEnabled: false,
      headerBackTitle: null,
      headerTintColor: '#3c4a55',
      showIcon: true,
    },
    cardStyle: {opacity: null},
    // transitionConfig: () => ({
    //   screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    // }),
    transitionConfig: () => ({
      transitionSpec: {
        duration: 400,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const {layout, position, scene} = sceneProps
        const {index} = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return {opacity, transform: [{translateY}]}
      },
    }),
  }
)

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

@connect(({router}) => ({router}))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const {dispatch, router} = this.props
    const navigation = addNavigationHelpers({dispatch, state: router})
    return <AppNavigator navigation={navigation}/>
  }
}

export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state)
}

export default Router
