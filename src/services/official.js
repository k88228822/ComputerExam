/**
 * Created by wangzhen on 2017/10/26.
 */

import {GET} from "../utils/net";
import * as URL from "../common/URL";

export const getData=()=>{
  return GET(URL.OFFICIAL_MSG);
}
