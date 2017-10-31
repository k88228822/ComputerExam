/**
 * Created by wangzhen on 2017/6/14.
 */
import Realm from 'realm';
const User = {
  name: 'User',
  properties: {
    userId: 'int',
    userName: 'string',
    headImgUrl: 'string',
    sex: 'string',
  }
};

//错题表
const Wrong = {
  name: 'Wrong',
  primaryKey: 'id',
  properties: {
    id: {type: 'int'},
    title: {type: 'string'},
    times: {type: 'int', default: 1},
    type: {type: 'int', default: 111},
    content: {type: 'string', default: ''},
  }
};

//题目收藏表
const Subject = {
  name: 'Subject',
  primaryKey: 'id',
  properties: {
    id: {type: 'int'},
    title: 'string',
    type: {type: 'int', default: 111},
    content: {type: 'string', default: ''},
  }
};

//下载表
const Download = {
  name: 'Download',
  properties: {
    subjectId: {type: 'int' ,default:1},
    directoryId: {type: 'int'},
    title: {type: 'string', default: ''},
    content: {type: 'string', default: ''},
  }
}

const realmDb = new Realm({schema: [User, Subject, Download, Wrong, ]});

export default realmDb;


