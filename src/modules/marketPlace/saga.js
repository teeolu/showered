import { takeLeading, call, put } from "redux-saga/effects";

import {
	addMarketplaceApi,
	editMarketplaceApi,
	getUserMarketplaceApi
} from "./api";
import {
	requestAddMarketplaceAction,
	receiveAddMarketplaceAction,
	requestEditMarketplaceAction,
	receiveEditMarketplaceAction,
	requestGetUserMarketplaceAction,
	receiveGetUserMarketplaceAction
} from "./actions";

function* addMarketplaceActionWatcher({ payload }) {
	try {
		const { dataToSubmit, navigation, navigateTo } = payload;
		const result = yield call(addMarketplaceApi, dataToSubmit);
		if (result.success) {
			yield put(receiveAddMarketplaceAction(payload));
			if (navigation) {
				navigation.navigate(navigateTo, { item: result.payload.docs });
			}
		} else {
			yield put(receiveAddMarketplaceAction(result));
		}
	} catch (error) {
		yield put(receiveAddMarketplaceAction(error));
	}
}

export function* requestAddMarketplaceActionSaga() {
	yield takeLeading(requestAddMarketplaceAction, addMarketplaceActionWatcher);
}

function* editMarketplaceActionWatcher({ payload }) {
	try {
		const { dataToSubmit, _id, navigation, navigateTo } = payload;
		const result = yield call(editMarketplaceApi, dataToSubmit, _id);

		if (result.success) {
			yield put(receiveEditMarketplaceAction(result));
			if (navigation) {
				navigation.navigate(navigateTo, { item: result.payload.docs[0] });
			}
			yield put(requestGetUserMarketplaceAction());
		} else {
			yield put(receiveEditMarketplaceAction(result));
		}
	} catch (error) {
		yield put(receiveEditMarketplaceAction(error));
	}
}

export function* requestEditMarketplaceActionSaga() {
	yield takeLeading(requestEditMarketplaceAction, editMarketplaceActionWatcher);
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
	yield takeLeading(
		requestGetUserMarketplaceAction,
		getUserMarketplaceActionWatcher
	);
}
