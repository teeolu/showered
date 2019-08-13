import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';

import { authReducer } from './auth/reducers';
import { imageUploadReducer } from './imageUpload/reducers';
import { marketplaceReducer } from './marketPlace/reducers';

import * as authSaga from './auth/saga'
import * as uploadImageActionSaga from './imageUpload/saga';
import * as addMarketplaceSaga from './marketPlace/saga';

export const rootReducer = combineReducers({
    authReducer,
    imageUploadReducer,
    marketplaceReducer
});

export function* rootSaga() {
    yield all([
        ...Object.values(authSaga),
        ...Object.values(uploadImageActionSaga),
        ...Object.values(addMarketplaceSaga)
    ].map(fork));
};

