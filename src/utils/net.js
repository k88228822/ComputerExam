/**
 * Created by wangzhen on 2017/7/13.
 */
import request from '../utils/request';
import qs ,{ parse } from 'qs';
import FormDataWrapper from 'object-to-formdata';
import merge from 'merge-object';

async function POST(url,params,isToken,isJson){
  if(isJson === undefined){isJson = false};
  if(isToken=== undefined){isToken= true};
  return request( url,merge({
    method: 'POST',
    mode: 'cors',
    body:isJson?JSON.stringify(params):FormDataWrapper(params),
  },isToken?'':''));
}

async function GET(url,params){
  return request( url + `?${qs.stringify(params)}`,{
    method: 'GET',
    mode: 'cors',
  });
}

export {POST,GET}
