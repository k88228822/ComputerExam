import LocalStorage from "../common/LocalStorage";
import * as Constants from "../common/Constants";
import ToastUtil from "../utils/ToastUtil";
import {GET} from "../utils/net";
import * as URL from "../common/URL";
import Realm from '../common/DbHelper';

export const changeDataStatus = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].isSelected = !data[i].isSelected;
  }
  return data;
}

export const getData = (params) => {
  return new Promise((resolve, reject) => {
    LocalStorage.get(Constants.STORAGE_SELECT_ID).then(value => {
      if (value === null) {
        reject('未选择科目');
        return;
      }
      GET(URL.MOCK_AND_OFFICIAL, {subjectId: value, issueKind: params.issueKind})
        .then(res => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

  })
}

export const upDateData = ({res, selected}) => {
  return new Promise(resolve => {
    let realmData = Realm.objects('Download');
    for (let i = 0; i < res.length; i++) {
      let temp = realmData.filtered(`subjectId=${res[i].subjectId} and directoryId=${res[i].id}`)
      res[i].isSelected = selected;
      res[i].status = temp.length === 0 ? 'normal' : 'downloaded';
    }
    resolve(res);
  })
}

export const downloadData = (params) => {
  return GET(URL.MOCK_OR_OFFICIAL_TEST, {...params})
}

export const addToDownloadDb = ({subjectId,directoryId,title,content}) => {
  return new Promise(resolve=>{
    Realm.write(() => {
      Realm.create('Download',
        {
          subjectId,directoryId,title,content
        }
      );
    })

  })
}
