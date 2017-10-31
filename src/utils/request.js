function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if(response.status===401){
    throw new Error('没有权限访问');
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function checkData(data) {
  if (data.successful) {
    return data.object
  }

  const error=new Error(data.object.message===undefined?data.object.status:data.object.message);
  throw error;
}

export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkData)
}
