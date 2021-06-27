//
//  ServiceAction.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:07:24 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {
  GENERAL_ACTION,
  GENERAL_ACTION_MULTIPLE_REQUEST,
  LOGOUT,
  NO_INTERNET,
} from './ActionTypes';
import {isNetworkReachable, isConnected} from 'react-native-reachability-popup';

callback = () => {};

Request = {
  url: String, //Service url
  method: String, //Web Service type 'post,get,put,delete....'
  data: Object, //Paramter for request
  actionType: Object,
};
// export function request(
//   url, //Service url
//   method, //Web Service type 'post,get,put,delete....'
//   data, //Paramter for request
//   actionType = null, //Action Type
//   showHud = true, //Show spinner
//   successCB = callback,
//   failureCB = callback,
// ) {
//   if (!isNetworkReachable() && !isConnected()) {
//     return {
//       type: NO_INTERNET,
//     };
//   }
//   return {
//     type: GENERAL_ACTION,
//     actionType,
//     url,
//     method,
//     data,
//     showHud,
//     successCB,
//     failureCB,
//   };
// }

export function request(
  types, //Action Type
  service, //Service url
  service_type, //Web Service type 'post,get,put,delete....'
  data, //Paramter for request
  showHud, //Show spinner
  successCB = callback,
  failureCB = callback,
  showMessage = true, //Show message on top
  showNetworkError = true,
  referencedReducer, // key to edit isFetching of reducer
  isConcat = false,
) {
  if (!isNetworkReachable() && !isConnected()) {
    return {
      type: NO_INTERNET,
    };
  }
  return {
    payload: data,
    service,
    service_type,
    type: GENERAL_ACTION,
    request_type: types,
    showHud,
    successCB,
    failureCB,
    showMessage,
    showNetworkError,
    referencedReducer, // key to edit isFetching of reducer
    isConcat,
  };
}
export function multipleRequest(
  requestArray: [Request],
  showHud = true,
  successCB = callback,
  failureCB = callback,
) {
  if (!isNetworkReachable() && !isConnected()) {
    return {
      type: NO_INTERNET,
    };
  }
  return {
    type: GENERAL_ACTION_MULTIPLE_REQUEST,
    requestArray,
    showHud,
    successCB,
    failureCB,
  };
}

export function generalSaveAction(
  type: string,
  data: object,
  isConcat: Boolean = false,
  meta: Object,
) {
  return {
    type,
    data,
    isConcat,
    meta,
  };
}

export function generalDispatchType(type: string) {
  return {
    type,
  };
}

export function requestAction(types) {
  return {
    type: types.REQUEST,
  };
}
export function success(type, data, meta, message, isConcat) {
  return {
    data,
    type: type.SUCCESS,
    meta,
    isConcat,
  };
}

export function failure(types, errorMessage) {
  return {
    errorMessage,
    type: types.FAILURE,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}
