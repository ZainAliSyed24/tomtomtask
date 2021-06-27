import _ from 'lodash';
import singleton from '../singleton';
import {store} from '../store';
import {request, generalSaveAction} from '../actions/ServiceAction';

const callback = (response) => global.log({response});

const callDispatch = (request) => {
  const dispatch = singleton.storeRef.dispatch;
  dispatch(request);
};

const getUser = () => {
  return singleton.storeRef.getState().loginReducer.data;
};

const dispatchRequest = (
  url, //Service url
  method, //Web Service type 'post,get,put,delete....'
  data, //Paramter for request
  actionType = null, //Action Type
  showHud = true, //Show spinner
  successCB = callback,
  failureCB = callback,
) => {
  store.dispatch(
    request(url, method, data, actionType, showHud, successCB, failureCB),
  );
};

const dispatchGeneralSaveAction = (type, data, isConcat) => {
  store.dispatch(generalSaveAction(type, data, isConcat));
};

const dispatchApi = (
  action, //Action Type
  api, //Service url
  method, //Web Service type 'post,get,put,delete....'
  payload, //Paramter for request
  loader = true, //Show spinner
  cbSuccess,
  cbFailure,
  message = true, //Show message on on top
  networkError = true, //Show network error
  actionBase,
  isConcat,
) => {
  store.dispatch(
    request(
      action,
      api,
      method,
      payload,
      loader,
      cbSuccess,
      cbFailure,
      message,
      networkError,
      actionBase,
      isConcat,
    ),
  );
};

const dispatchGeneralSave = (
  action, //Action Type
  data,
  isConcat,
  meta,
) => {
  store.dispatch(generalSaveAction(action, data, isConcat, meta));
};

export {
  getUser,
  callDispatch,
  dispatchRequest,
  dispatchApi,
  dispatchGeneralSaveAction,
  dispatchGeneralSave,
};
