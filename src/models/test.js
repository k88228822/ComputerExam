import {createAction} from "../utils/index";
import * as testServices from "../services/test";
import ToastUtil from "../utils/ToastUtil";

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
    setShow(state,{payload}){
      return{
        ...state,
        show:payload.show,
      }
    },
    setData(state, {payload}) {
      return {
        ...state,
        show: true,
        data: payload.data,
        dataSource: payload.data.array,
      }
    },
    clearData(state, {payload}) {
      return {
        ...state,
        showAnswer: false,
        modelVisible: false,
        currentNum: 1,
      }
    },
    itemSelected(state, {payload}) {
      return {
        ...state,
        data: payload.data,
        showAnswer: true,
        dataSource: payload.dataSource
      }
    },
    pageChange(state, {payload}) {
      return {
        ...state,
        type: payload.type,
        currentNum: payload.currentNum,
        showAnswer: payload.showAnswer,
        isCollected: payload.isCollected,
      }
    },
    setAnswerCard(state, {payload}) {
      return {
        ...state,
        modelVisible: payload.modelVisible
      }
    },
    changeCollectStatus(state, {payload}) {
      return {
        ...state,
        isCollected: payload.isCollected
      }
    },
    answerPress(state, {payload}) {
      let data = state.data;
      data.array[state.currentNum - 1].showAnswer = !data.array[state.currentNum - 1].showAnswer;
      return {
        ...state,
        data: data,
        showAnswer: !state.showAnswer,
        dataSource: data.array,
      }
    },
  },
  effects: {
    //获取试题数据
    * getTestBySIDandDID({payload}, {call, put}) {
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
    * onItemClicked({payload}, {call, put, select}) {
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
    * onPageChanged({payload}, {select, call, put}) {
      let test = yield select(state => state.test);
      let type;
      if (payload.index < test.data.one) {
        type = '单选题';
      } else if (payload.index < (test.data.two + test.data.one)) {
        type = '填空题';
      } else {
        type = '操作题';
      }
      let isCollected = yield call(testServices.isCollected, {data: test.data, index: payload.index})
      yield put(createAction('pageChange')({
        type,
        currentNum: (payload.index + 1),
        showAnswer: test.data.array[payload.index].showAnswer,
        isCollected,
      }))
    },
    * onCollectPress({payload}, {select, call, put}) {
      let temp = yield select(state => state.test);
      let data = temp.data.array[temp.currentNum - 1];
      let {id, title, type} = data;
      yield put(createAction('changeCollectStatus')({isCollected: !temp.isCollected}))
      yield call(testServices.setCollectSubjeact, {id, title, type, data})
    },
    * getOfflineData({payload}, {call, put}) {
      try {
        let data = yield call(testServices.getOfflineData, {
          subjectId: payload.subjectId,
          directoryId: payload.directoryId
        })
        yield put(createAction('setData')({data}))
        if (data.array.length > 0) {
          let isCollected = yield call(testServices.isCollected, {data, index: 0})
          yield put(createAction('changeCollectStatus')({isCollected}))
        }
      } catch (e) {
        ToastUtil.showShort(e);
      }
    },
    * getLocalData({payload}, {call, put}) {
      try {
        let data = yield call(testServices.getLocalData, {tableName: payload.tableName})
        yield put(createAction('setData')({data}))
        if (data.array.length > 0) {
          let isCollected = yield call(testServices.isCollected, {data, index: 0})
          yield put(createAction('changeCollectStatus')({isCollected}))
        }
      } catch (e) {
        ToastUtil.showShort(e);
      }
    }
  },
}
