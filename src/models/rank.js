
const data=[
  {name:'争取超过第一名',sex:'female',headerUrl:require('../images/account/head.png'),num:362},
  {name:'争取超过第一名',sex:'female',headerUrl:require('../images/account/head.png'),num:362},
  {name:'争取超过第一名',sex:'male',headerUrl:require('../images/account/head.png'),num:362},
  {name:'争取超过第一名',sex:'male',headerUrl:require('../images/account/head.png'),num:362},
  {name:'争取超过第一名',sex:'male',headerUrl:require('../images/account/head.png'),num:362},
  {name:'争取超过第一名',sex:'male',headerUrl:require('../images/account/head.png'),num:362},
  {name:'争取超过第一名',sex:'male',headerUrl:require('../images/account/head.png'),num:362},
]
export default {
  namespace: 'rank',
  state: {
    num: 84,
    name: '黎明下的雪地',
    headerUrl: '',
    rank: 26,
    dataSource:data,
  },
  reducers: {},
  effects: {},
}
