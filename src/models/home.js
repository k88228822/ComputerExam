/**
 * Created by wangzhen on 2017/10/23.
 */
import {getBannerList, getDays, setSubject} from "../services/home";
import {createAction} from "../utils/index";
import ToastUtil from "../utils/ToastUtil";

const selectData = [
  {img: require('../images/select/icon_c.png'), name: 'C 语言程序设计'},
  {img: require('../images/select/icon_vb.png'), name: 'VB 语言程序设计'},
  {img: require('../images/select/icon_java.png'), name: 'JAVA 语言程序设计'},
  {img: require('../images/select/icon_c_plus.png'), name: 'C++ 语言程序设计'},
  {img: require('../images/select/icon_office.png'), name: 'Office 高级应用'},
  {img: require('../images/select/icon_access.png'), name: 'Access 数据库程序设计'}
];

export default {
  namespace: 'home',
  state: {
    title: '计算机C语言程序',
    subjectId: 1,
    urls: [
      'http://www.wangzhentest.cn/assets/banner_1.jpg',
      'http://www.wangzhentest.cn/assets/banner_2.jpg',
      'http://www.wangzhentest.cn/assets/banner_3.jpg'
    ],
    time: [],
    selectData,
    selectModelVisible:false,
  },
  reducers: {
    setUrls(state, {payload}) {
      return {
        ...state,
        urls: payload.urls
      }
    },
    setSelectModalVisible(state,{payload}){
     return{
       ...state,
       selectModelVisible:payload.visible
     }
    },
    setSelectSubject(state, {payload}){
      return {...state, title: payload.title, subjectId: payload.subjectId}
    },
    setDays(state,{payload}){
      return{
        ...state,
        time:payload.time
      }
    }

  },
  effects: {

    * getBannerList({payload}, {call, put}) {
      try {
        const urls = yield call(getBannerList)

        if (urls.length > 0) {
          yield put(createAction('setUrls')({urls}))
        }
      }catch(e){
        ToastUtil.showShort(e);
      }

    },

    * setSubject({payload}, {call, put}){
      try {
        yield call(setSubject, {data: payload.data, index: payload.index})
        yield put(createAction('setSelectSubject')({title: payload.data, subjectId: parseInt(payload.index) + 1}))
      }catch(e){
        ToastUtil.showShort(e);
      }
    },

    * getDays({payload},{call,put}){
      try {
        let res = yield call(getDays)
        let time = Array.from([res.one, res.two, res.three])
        yield put(createAction('setDays')({time}))
      }catch (e){
        ToastUtil.showShort(e);
      }
    }

  },
}

