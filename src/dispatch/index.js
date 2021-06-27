import React, {useRef, useContext} from 'react';
import {
  NEAR_BY_RESTAURANTS,  
} from '../actions/ActionTypes';
import constant from '../constants';

import {
  dispatchRequest,
  dispatchApi,
  dispatchGeneralSave,
} from '../reuseableFunctions';
import {generalSaveAction, logout} from '../actions/ServiceAction';
import {closeDrawer, pop, reset} from '../services/NavigationService';
import {store} from '../store';
import HttpServiceManager from '../services/HttpServiceManager';

import utility from '../utility';

const dispatchNearByRestaurants = ({lat, lon, key}, cbSuccess, cbFailure) => {
  // console.log(constant.nearByResturants, NEAR_BY_RESTAURANTS, lat, lon, key)
  dispatchApi(
    NEAR_BY_RESTAURANTS,
    `${constant.nearByResturants}?lat=${lat}&lon=${lon}&key=${key}`,
    'GET',
    {},
    true,
    cbSuccess,
    cbFailure,
    false,
    false,
  );
};

export {
  dispatchNearByRestaurants,  
};
