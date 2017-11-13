import {GET} from "../utils/net";
import * as URL from '../common/URL';

export const searchRecommend= (params) => {
  return GET(URL.GET_SEARCH_RECOMMEND,{...params})
}