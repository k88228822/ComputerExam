import {createAction, NavigationActions} from '../utils'
import * as homeService from '../services/home';
import * as offlineService from "../services/offline";
import ToastUtil from "../utils/ToastUtil";

export default {
  namespace: 'offline',
  state: {
    title: '离线题库',
    dataSource: [],
    show: false,
    complete: false,
  },
  reducers: {
    updateOfflineData(state, {payload}) {
      return {
        ...state,
        dataSource: payload.data,
        show: true
      }
    },

  },
  effects: {
    * getData({payload}, {call, put}) {
      try {
        let data = yield call(offlineService.getOfflineData)
        yield put(createAction('updateOfflineData')({data}))
      } catch (e) {

      }
    },

  },
}


