/**
 * Created by wangzhen on 2017/10/27.
 */

import {GET} from "../utils/net";
import * as URL from "../common/URL";
import Realm from '../common/DbHelper'

export const getTestBySIdAndId = ({subjectId, directoryId}) => {
  return GET(URL.MOCK_OR_OFFICIAL_TEST, {subjectId, directoryId})
}

export const changeResultData = (res) => {
  let list = {array: [],};
  res.questionList.map(item => {
    item.map(k => k.status = 0);
    list.array.push(...item);
  });
  list.one = res.questionList[0].length;
  list.two = res.questionList[1].length;
  list.three = res.questionList[2].length;
  list.total = res.total;
  return list;
}

//是否收藏
export const isCollected = (params) => {
  return new Promise((resolve, reject) => {
    let isCollected = false;
    if (params.data.array.length > 0) {
      console.log('Jin ru')
      isCollected = Realm.objects('Subject').filtered(`id=${params.data.array[params.index].id}`).length > 0;
      resolve(isCollected)
    } else {
      reject('没有找到数据')
    }
  });

}

//加入错题集
export const writeToWrong = ({id, title, type, content}) => {
  return new Promise((resolve, reject) => {
    let realmData = Realm.objects('Wrong').filtered(`id=${id}`);
    Realm.write(() => {
      realmData.length === 0 ?
        Realm.create('Wrong', {id, title, type, content:JSON.stringify(content)})
        :
        Realm.create('Wrong', {id: id, times: realmData[0].times + 1}, true);
      resolve(true)
    });
    reject('写入错题集出错')
  });
}
