import { handleActions, combineActions } from 'redux-actions';

import {
    requestSignupAction,
    receiveSignupAction,
    requestLoginAction,
    receiveLoginAction,
    receiveUserinfoAction
} from './action';

const defaultState = {
    isLoading: false
}

export const authStatus = {
    login: 'login',
    signup: 'signup'
}

export const authReducer = handleActions(
    {
        [requestSignupAction]: (state, action) => {
            return {
                ...state,
                isLoading: true,
                request: authStatus.signup
            };
        },
        [receiveSignupAction]: {
            next(state, action) {
                const { payload } = action;
                return {
                    ...state,
                    isLoading: false,
                    request: authStatus.signup
                };
            },
            throw(state, action) {
                const { payload } = action;
                return {
                    ...state,
                    isLoading: false,
                    request: authStatus.signup
                };
            }
        },
        [requestLoginAction]: (state, action) => {
            console.log("receiveLoginAction action ", action)
            return {
                ...state,
                isLoading: true,
                request: authStatus.login
            };
        },
        [receiveLoginAction]: {
            next(state, action) {
                const { payload } = action;
                return {
                    ...state,
                    isLoading: false,
                    request: authStatus.login
                };
            },
            throw(state, action) {
                const { payload } = action;
                return {
                    ...state,
                    isLoading: false,
                    request: authStatus.login
                };
            }
        },
        [receiveUserinfoAction]: {
            next(state, action) {
                const { payload } = action;
                return {
                    ...state,
                    userdata: {
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        email: payload.email
                    }
                };
            },
            throw(state, action) {
                const { payload } = action;
                return {
                    ...state,
                    ...payload
                };
            }
        }
    }, 
    defaultState
);