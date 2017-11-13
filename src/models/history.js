import * as historyService from "../services/history";
import {delay, createAction} from "../utils/index";
import ToastUtil from "../utils/ToastUtil";
import _ from 'lodash';

const data = [
  {isSelected: false, status: 'normal', id: 42, kind: 'EXAM', subjectId: 1, title: '第 1 章程序设计基本概念'},
];

export default {
  namespace: 'history',
  state: {
    data,
    show: false,
    title: '教育部教材2017版章后习题_C语言',
    download: false,
    downloadProgress: 0,
    showDownload: false,
    finished: false,
    showContent: false,
  },
  reducers: {
    changeData(state, {payload}) {
      return {
        ...state,
        data: payload.data,
      }
    },
    setShow(state, {payload}) {
      return {
        ...state,
        show: payload.show,
      }
    },
    setShowReverse(state) {
      return {
        ...state,
        show: !state.show,
      }
    },
    setShowContent(state, {payload}) {
      return {
        ...state,
        showContent: payload.showContent
      }
    },
    onDownloadComplete(state) {
      return {
        ...state,
        showDownload: false,
        downloadProgress: 0,
        finished: false,
      }
    },
    setDownloadProgress(state, {payload}) {
      return {
        ...state,
        downloadProgress: payload.downloadProgress,
      }
    },
    setFinished(state, {payload}) {
      return {
        ...state,
        finished: payload.finished
      }
    },
    setShowDownload(state, {payload}) {
      return {
        ...state,
        showDownload: payload.showDownload,
      }
    }

  },
  effects: {
    * initData({payload}, {call, put}) {
      try {
        let data = yield call(historyService.getData, {issueKind: payload.issueKind})
        yield put(createAction('upDateData')({data, selected: false}))
        yield put(createAction('setShowContent')({showContent: true}))
        yield put(createAction('setShow')({show: false}))
      } catch (e) {
        ToastUtil.showShort(e)
      }
    },

    * upDateData({payload}, {call, put}) {
      try {
        let data = yield call(historyService.upDateData, {res: _.cloneDeep(payload.data), selected: payload.selected})
        yield put(createAction('changeData')({data}))
      }catch(e){
        ToastUtil.showShort(e);
      }
    },

    * onDownloadPress({payload}, {select, call, put}) {
      try {
        let history = yield  select(state => state.history)
        let data = historyService.changeDataStatus(history.data);
        yield put(createAction('setShowReverse')())
        yield put(createAction('changeData')({data}))
      }catch(e){
        ToastUtil.showShort(e);
      }
    },

    * downloadData({payload}, {select, call, put}) {
      try {
        let history = yield select(state => state.history);

        if (history.data[payload.index].status === 'normal') {
          let res = yield call(historyService.downloadData, {
            subjectId: history.data[payload.index].subjectId, directoryId: history.data[payload.index].id
          })

          yield put(createAction('setFinished')({finished: true}))

          yield call(historyService.addToDownloadDb, {
            subjectId: history.data[payload.index].subjectId,
            directoryId: history.data[payload.index].id,
            title: history.data[payload.index].title,
            content: JSON.stringify(res)
          })
        }
      }catch (e){
        ToastUtil.showShort(e);
      }

    },

    * downloadTime({payload}, {select, call, put}) {
      let history = yield select(state => state.history);
      try {
        if (history.data[payload.index].status === 'normal') {
          yield put(createAction('setShowDownload')({showDownload: true}))
          let timesRun = 0;

          while (true) {
            timesRun = timesRun === 90 ? timesRun : timesRun + 10;
            history = yield select(state => state.history);
            if (timesRun >= 90 && history.finished) {
              break;
            } else {
              yield put(createAction('setDownloadProgress')({downloadProgress: timesRun}))
            }
            yield call(delay, 100)
          }

          yield put(createAction('onDownloadComplete')())
          yield put(createAction('upDateData')({data: history.data, selected: true}))
        }
      } catch (e) {
        ToastUtil.showShort(e);
      }

    },

    * downloadTest({payload}, {put}) {
      try {
        yield put(createAction('downloadData')({...payload}));
        yield put(createAction('downloadTime')({...payload}));
      }catch(e){
        ToastUtil.showShort(e);
      }
    }

  },
}
