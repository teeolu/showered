import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';

import { authReducer } from './auth/reducers';
import { imageUploadReducer } from './imageUpload/reducers';

import * as authSaga from './auth/saga'
import * as uploadImageActionSaga from './imageUpload/saga';

export const rootReducer = combineReducers({
    authReducer,
    imageUploadReducer
});

export function* rootSaga() {
    yield all([
        ...Object.values(authSaga),
        ...Object.values(uploadImageActionSaga)
    ].map(fork));
};

