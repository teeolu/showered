import { takeLeading, takeEvery, call, put } from 'redux-saga/effects';

import { 
	imageUploadApi, 
	removeImageUploadApi } from './api';
import {
	requestImageUploadAction,
	receiveImageUploadAction,
	requestRemoveImageUploadAction,
	receiveRemoveImageUploadAction
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
	yield takeLeading(requestImageUploadAction, imageUploadActionWatcher)
}

function* removeImageUploadActionWatcher({ payload }) {
	try {
		const result = yield call(removeImageUploadApi, payload.public_id);
		if (result.success == true) {
			yield put(receiveRemoveImageUploadAction(result.payload));
		}
		else {
			const error = result instanceof Error ? result : new Error(result.message ? result.message : `HTTP Error: status = ${result.status}`);
			yield put(receiveRemoveImageUploadAction(error));
		}
	} catch (error) {
		yield put(receiveRemoveImageUploadAction(error));
	}
}

export function* removeUploadImageActionSaga() {
	yield takeLeading(requestRemoveImageUploadAction, removeImageUploadActionWatcher)
}