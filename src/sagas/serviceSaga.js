//
//  serviceSaga.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:29:45 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {put, call, takeEvery, take} from 'redux-saga/effects';
import {success, failure, requestAction} from '../actions/ServiceAction';
import HttpServiceManager from '../services/HttpServiceManager';
import {
  GENERAL_ACTION,
  GENERAL_ACTION_MULTIPLE_REQUEST,
} from '../actions/ActionTypes';

function callRequest(
  service,
  payload,
  service_type,
  showHud,
  showMessage,
  showNetworkError,
) {
  return HttpServiceManager.getInstance().request(
    service,
    payload,
    service_type,
    showHud,
    showMessage,
    showNetworkError,
  );
}

function* watchRequest(action) {
  const {
    payload,
    service,
    service_type,
    request_type,
    successCB,
    failureCB,
    showHud,
    showMessage,
    showNetworkError,
    isConcat,
  } = action;
  try {
    const {response, meta = {}, message = ''} = yield call(
      callRequest,
      service,
      payload,
      service_type,
      showHud,
      showMessage,
      showNetworkError,
    );

    // successCB({response: response.response.data});
    // yield put(success(request_type, response.response.data));
    console.log(
      'response saga  : ',
      response,
      'META  : ',
      meta,
      'message : ',
      message,
    );
    successCB && successCB(response, meta, message);

    if (request_type) {
      yield put(success(request_type, response, meta, message, isConcat));
    }
  } catch (err) {
    // console.log('catch  service saga : ', err);
    failureCB(err);
    yield put(failure(request_type, err));
  }
}

//SECTION End
// SECTION Starts Mulitple Request work
function callMultipleRequest({requestArray, showHud}) {
  let requests = [];
  for (const {url, method, data} of requestArray) {
    requests.push(
      HttpServiceManager.getInstance().getRequestObject(url, data, method),
    );
  }
  return HttpServiceManager.getInstance().multipleRequest(requests, showHud);
}
function* watchMulitpleRequest(action) {
  const {requestArray, successCB, failureCB} = action;
  try {
    for (let req of requestArray) {
      yield put(requestAction(req.actionType));
    }
    const responses = yield call(callMultipleRequest, action);
    for (let index in responses) {
      if (requestArray[index].actionType) {
        yield put(success(requestArray[index].actionType, responses[index]));
      }
    }
    successCB(responses);
  } catch (error) {
    for (let index in requestArray) {
      if (requestArray[index].actionType) {
        yield put(failure(requestArray[index].actionType, error));
      }
    }
    failureCB(error);
  }
}
//SECTION End
export default function* root() {
  yield takeEvery(GENERAL_ACTION, watchRequest);
  yield takeEvery(GENERAL_ACTION_MULTIPLE_REQUEST, watchMulitpleRequest);
}
