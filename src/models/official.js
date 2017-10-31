import * as Official from "../services/official";
import {createAction} from "../utils/index";

export default {
  namespace: 'official',
  state: {
    data:[],
    shows: new Set([]),
    refreshing: false,
  },
  reducers: {
    setData(state,{payload}){
      return{
        ...state,
        data:payload.data
      }
    }
  },
  effects: {
    *getData({payload},{call,put}){
      let data=yield call(Official.getData)
      yield put(createAction('setData')({data}));
    }
  },
}
