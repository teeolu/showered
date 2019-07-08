import { createAction } from 'redux-actions';

export const requestSignupAction = createAction('REQUEST_SIGNUP');
export const receiveSignupAction = createAction('RECEIVE_SIGNUP');

export const requestLoginAction = createAction('REQUEST_LOGIN');
export const receiveLoginAction = createAction('RECEIVE_LOGIN');