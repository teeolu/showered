import { createAction } from 'redux-actions';

export const requestAddMarketplaceAction = createAction('REQUEST_ADD_MARKETPLACE_ACTION');
export const receiveAddMarketplaceAction = createAction('RECEIVE_ADD_MARKETPLACE_ACTION');

export const requestEditMarketplaceAction = createAction('REQUEST_EDIT_MARKETPLACE_ACTION');
export const receiveEditMarketplaceAction = createAction('RECEIVE_EDIT_MARKETPLACE_ACTION');

export const requestGetUserMarketplaceAction = createAction('REQUEST_GET_USER_MARKETPLACE_ACTION');
export const receiveGetUserMarketplaceAction = createAction('RECEIVE_GET_USER_MARKETPLACE_ACTION')