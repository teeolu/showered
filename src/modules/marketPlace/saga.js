import { takeLeading, call, put } from 'redux-saga/effects';

import { addMarketplaceApi } from './api';
import {
    requestAddMarketplaceAction,
    receiveAddMarketplaceAction
} from './actions';

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