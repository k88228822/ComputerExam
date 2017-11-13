import {createAction} from "../utils/index";
import * as searchService from "../services/search";
import ToastUtil from "../utils/ToastUtil";

const data = [{name: '十分钟学会思维导图', img: 0},
  {name: '记忆术与思维导图(第二版)', img: 1},
  {name: 'FreeMind思维导图工具介绍', img: 1},
  {name: '思维导图在产品需求分析和交互设计中的必要性', img: 0},
];

export default {
  namespace: 'search',
  state: {
    searchText: '',
    dataSource: data,
    showResult: false,
    history: [],
    recommend: [],
  },

  reducers: {
    setTextAndResult(state, {payload}) {
      return {
        ...state,
        searchText: payload.text,
        showResult: payload.showResult
      }
    },
    setHistory(state, {payload}) {
      return {
        ...state,
        history: payload.history,
      }
    },
    setRecommend(state,{payload}){
     return{
       ...state,
       recommend:payload.recommend,
     }
    }


  },

  effects: {
    * getSearchRecommend({payload}, {call, put}) {
      try {
      let recommend= yield call(searchService.searchRecommend, {total: 10})
      yield put(createAction('setRecommend')({recommend}))
      }catch (e){
        ToastUtil.showShort(e);
      }
    },
    * searchData() {

    },
    * addSearchHistory({payload},{call,put}){
      
    },


  },

}
