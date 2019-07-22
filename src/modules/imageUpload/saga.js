import { takeLeading, takeEvery, call, put } from 'redux-saga/effects';

import { imageUploadApi } from './api';
import {
    requestImageUploadAction,
    receiveImageUploadAction
} from './actions';

function* imageUploadActionWatcher({ payload }) { 
    try {
		const result = yield call(imageUploadApi, payload.formData);
		if (result.success == true) {
			yield put(receiveImageUploadAction(result.payload));
		}
		else {
            const error = result instanceof Error ? result : new Error(result.message ? result.message : `HTTP Error: status = ${result.status}`);
            yield put(receiveImageUploadAction(error));
		}
	} catch (error) {
		yield put(receiveImageUploadAction(error));
	}
}

export function* uploadImageActionSaga() {
    yield takeEvery(requestImageUploadAction, imageUploadActionWatcher)
}