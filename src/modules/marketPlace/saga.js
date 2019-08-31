import { takeLeading, call, put } from "redux-saga/effects";

import {
	addMarketplaceApi,
	editMarketplaceApi,
	getUserMarketplaceApi,
	getUserMarketplacePendingAdminApi,
	getUserMarketplacePendingStaffApi
} from "./api";
import {
	requestAddMarketplaceAction,
	receiveAddMarketplaceAction,
	requestEditMarketplaceAction,
	receiveEditMarketplaceAction,
	requestGetUserMarketplaceAction,
	receiveGetUserMarketplaceAction,
	requestGetUserMarketplacePendingAdminAction,
	receiveGetUserMarketplacePendingAdminAction,
	requestGetUserMarketplacePendingStaffAction,
	receiveGetUserMarketplacePendingStaffAction
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

function* getUserMarketplacePendingAdminActionWatcher({ payload }) {
	try {
		const { marketPlaceId } = payload;
		const result = yield call(getUserMarketplacePendingAdminApi, marketPlaceId);
		if (result.success) {
			yield put(receiveGetUserMarketplacePendingAdminAction(result));
		} else {
			yield put(receiveGetUserMarketplacePendingAdminAction(result));
		}
	} catch (error) {
		yield put(receiveGetUserMarketplacePendingAdminAction(error));
	}
}

export function* requestGetUserMarketplacePendingAdminActionSaga() {
	yield takeLeading(
		requestGetUserMarketplacePendingAdminAction,
		getUserMarketplacePendingAdminActionWatcher
	);
}

function* getUserMarketplacePendingStaffActionWatcher({ payload }) {
	try {
		const { marketPlaceId } = payload;
		const result = yield call(getUserMarketplacePendingStaffApi, marketPlaceId);
		if (result.success) {
			yield put(receiveGetUserMarketplacePendingStaffAction(result));
		} else {
			yield put(receiveGetUserMarketplacePendingStaffAction(result));
		}
	} catch (error) {
		yield put(receiveGetUserMarketplacePendingStaffAction(error));
	}
}

export function* requestGetUserMarketplacePendingStaffActionSaga() {
	yield takeLeading(
		requestGetUserMarketplacePendingStaffAction,
		getUserMarketplacePendingStaffActionWatcher
	);
}
