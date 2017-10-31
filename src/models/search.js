
import {createAction} from "../utils/index";

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
    history: ['二叉树', '算法', '前序遍历', '空指针问题'],
    recommend: [],
  },

  reducers: {
    setTextAndResult(state,{payload}){
     return{
       ...state,
       searchText:payload.text,
       showResult:payload.showResult
     }
    },


  },

  effects: {

  },

}
