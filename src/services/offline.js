import Realm from '../common/DbHelper';

export const getOfflineData = () => {
  return new Promise(resolve => {
    let data = [];
    Realm.objects('Download').map((item) => {
      data.push(item)
    });
    resolve(data)
  });
}
