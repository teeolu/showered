import { takeLeading, call, put } from 'redux-saga/effects';

import { 
    addMarketplaceApi,
    getUserMarketplaceApi } from './api';
import {
    requestAddMarketplaceAction,
    receiveAddMarketplaceAction,
    requestGetUserMarketplaceAction,
    receiveGetUserMarketplaceAction } from './actions';

function* addMarketplaceActionWatcher({ payload }) {
    try {
        const { dataToSubmit, navigation, navigateTo } = payload;
        const result = yield call(addMarketplaceApi, dataToSubmit);
        if (result.success) {
            yield put(receiveAddMarketplaceAction(payload));
            if (navigation) {
                navigation.navigate(navigateTo)
            }
        } else {
            yield put(receiveAddMarketplaceAction(result));
        }
    } catch (error) {
        yield put(receiveAddMarketplaceAction(error));
    }
}

export function* requestAddMarketplaceActionSaga() {
    yield takeLeading(requestAddMarketplaceAction, addMarketplaceActionWatcher)
}

function* getUserMarketplaceActionWatcher() {
    try {
        const result = yield call(getUserMarketplaceApi);
        if (result.success) {
            yield put(receiveGetUserMarketplaceAction(result));
        } else {
            yield put(receiveGetUserMarketplaceAction(result));
        }
    } catch (error) {
        yield put(receiveGetUserMarketplaceAction(error));
    }
}

export function* requestGetUserMarketplaceActionSaga() {
    yield takeLeading(requestGetUserMarketplaceAction, getUserMarketplaceActionWatcher)
}