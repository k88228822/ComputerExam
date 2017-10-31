
import {createAction} from "../utils/index";
import * as testServices from "../services/test";

var data = {
  array: [],
  total: 1,
  one: 1,
  two: 1,
  three: 1,
};

export default {
  namespace: 'test',
  state: {
    data: data,
    title: '1.1 结构化程序设计',
    type: '单选题',
    currentNum: 1,
    dataSource: [],
    showAnswer: false,
    isCollected: false,
    modelVisible: false,
    show: false,
  },
  reducers: {
    setData(state, {payload}){
      return {
        ...state,
        show: true,
        data: payload.data,
        dataSource: payload.data.array,
      }
    },
    clearData(state,{payload}){
      return {
        ...state,
        showAnswer: false,
        modelVisible: false,
      }
    },
    itemSelected(state, {payload}){
      return {
        ...state,
        data: payload.data,
        showAnswer: true,
        dataSource: payload.dataSource
      }
    },
  },
  effects: {
    //获取试题数据
    *getTestBySIDandDID({payload}, {call, put}){
      let data = yield call(testServices.getTestBySIdAndId, {
        subjectId: payload.subjectId,
        directoryId: payload.directoryId
      })
      data = testServices.changeResultData(data);
      yield put(createAction('setData')({data}))
      if (data.array.length > 0) {
          let isCollected = yield call(testServices.isCollected, {data, index: 0})
          yield put(createAction('changeCollectStatus')({isCollected}))
      }
    },
    //选择答案
    *onItemClicked({payload}, {call, put, select}){
      let temp = yield select(state => state.test);
      temp.data.array[temp.currentNum - 1].showAnswer = true;
      temp.data.array[temp.currentNum - 1].status = payload.status === true ? 1 : 2;
      yield put(createAction('itemSelected')({data: temp.data, dataSource: temp.data.array}))
      if (!payload.status) {
        let content = temp.data.array[temp.currentNum - 1];
        let {id, title, type} = content;
        yield call(testServices.writeToWrong, {id, title, type, content});
      }
    },



   }
}
