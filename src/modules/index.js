import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';

import { authReducer } from './auth/reducers';
import * as authSaga from './auth/saga'

export const rootReducer = combineReducers({
    authReducer
});

export function* rootSaga() {
    yield all([
        ...Object.values(authSaga)
    ].map(fork));
};

