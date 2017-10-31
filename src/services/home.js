/**
 * Created by wangzhen on 2017/10/23.
 */

import * as URL from "../common/URL";
import {GET} from "../utils/net";
import LocalStorage from "../common/LocalStorage";
import * as Constants from "../common/Constants";

export const getBannerList = () => {
  return GET(URL.BANNER_LIST)
}

export const setSubject = ({data, index}) => {
  return new Promise((resolve, reject) => {
    LocalStorage.save(Constants.STORAGE_SELECT_NAME, data);
    LocalStorage.save(Constants.STORAGE_SELECT_ID, parseInt(index) + 1);
    resolve(true)
  });
}

export const getDays = () => {
    return GET(URL.DAYS)
}

export const getLocalSubjectId = () => {
  return LocalStorage.get(Constants.STORAGE_SELECT_ID);
}

export const getOfficialBook = ({id}) => {
  return GET(URL.OFFICIAL_BOOK, {subjectId: id})
}



