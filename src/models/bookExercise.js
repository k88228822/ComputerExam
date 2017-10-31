import {getLocalSubjectId, getOfficialBook} from "../services/home";
import {createAction} from "../utils/index";
import {NavigationActions} from "react-navigation";

export default {
  namespace: 'bookExercise',
  state: {
    title: '教育部教材2017版章后习题_C语言',
    show: false,
    listData: [],
    refreshing: false,
  },

  reducers: {
    setShow(state, {payload}) {
      return {
        ...state,
        show: payload.show
      }
    },
    setOfficialBook(state, {payload}) {
      return {
        ...state,
        title: `教育部教材${payload.subject.year}版章后习题_${payload.subject.shortName}`,
        listData: payload.chapterTree,
      }
    },
  },

  effects: {
    * getOfficialBook({payload}, {call, put}) {
      let id= yield call(getLocalSubjectId)
      id= id===null? 1:id;
      let book = yield call(getOfficialBook, {id})

      yield put(createAction('setOfficialBook')({...book}));
      yield put(createAction('setShow')({show: true}))
    },
  },
}
