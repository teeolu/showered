import { takeLeading, call, put } from "redux-saga/effects";

import {
	addServiceDetailsApi,
	editServiceDetailsApi,
	getMarketplaceServiceDetailsApi,
	getAdminsMarketplaceApi,
	getStaffsMarketplaceApi
} from "./api";
import {
	requestAddMarketplaceServiceDetailsAction,
	receiveAddMarketplaceServiceDetailsAction,
	requestEditMarketplaceServiceDetailsAction,
	receieveEditMarketplaceServiceDetailsAction,
	requestGetMarketplaceDetailsAction,
	receiveGetMarketplaceDetailsAction,
	requestGetAdminsMarketplaceAction,
	receiveGetAdminsMarketplaceAction,
	requestGetStaffsMarketplaceAction,
	receiveGetStaffsMarketplaceAction,
	requestSetCurrentMarketplace,
	receiveSetCurrentMarketplace
} from "./actions";

function* addServiceDetailsActionWatcher({ payload }) {
	try {
		const { dataToSubmit, navigation, navigateTo } = payload;
		const result = yield call(addServiceDetailsApi, dataToSubmit);
		if (result.success) {
			yield put(receiveAddMarketplaceServiceDetailsAction(payload));
			if (navigation) {
				navigation.navigate(navigateTo, { item: result.payload.docs });
			}
		} else {
			yield put(receiveAddMarketplaceServiceDetailsAction(result));
		}
	} catch (error) {
		yield put(receiveAddMarketplaceServiceDetailsAction(error));
	}
}

export function* requestAddMarketplaceServiceDetailsActionSaga() {
	yield takeLeading(
		requestAddMarketplaceServiceDetailsAction,
		addServiceDetailsActionWatcher
	);
}

function* editServiceDetailsActionWatcher({ payload }) {
	try {
		const { dataToSubmit, _id, navigation, navigateTo } = payload;
		const result = yield call(editServiceDetailsApi, dataToSubmit, _id);
		if (result.success) {
			yield put(receieveEditMarketplaceServiceDetailsAction(result));
			if (navigation) {
				navigation.navigate(navigateTo, { item: result.payload.docs[0] });
			}
			yield put(requestGetMarketplaceDetailsAction({ marketPlaceId: _id }));
		} else {
			yield put(receieveEditMarketplaceServiceDetailsAction(result));
		}
	} catch (error) {
		yield put(receieveEditMarketplaceServiceDetailsAction(error));
	}
}

export function* requestEditMarketplaceServiceDetailsActionSaga() {
	yield takeLeading(
		requestEditMarketplaceServiceDetailsAction,
		editServiceDetailsActionWatcher
	);
}

function* getMarketplaceServiceDetailsActionWatcher({ payload }) {
	try {
		const { marketPlaceId } = payload;
		const result = yield call(getMarketplaceServiceDetailsApi, marketPlaceId);
		if (result.success) {
			yield put(receiveGetMarketplaceDetailsAction(result));
		} else {
			yield put(receiveGetMarketplaceDetailsAction(result));
		}
	} catch (error) {
		yield put(receiveGetMarketplaceDetailsAction(error));
	}
}

export function* getMarketplaceServiceDetailsActionSaga() {
	yield takeLeading(
		requestGetMarketplaceDetailsAction,
		getMarketplaceServiceDetailsActionWatcher
	);
}

function* getAdminsMarketplaceActionWatcher({ payload }) {
	try {
		const { marketPlaceId } = payload;
		const result = yield call(getAdminsMarketplaceApi, marketPlaceId);
		if (result.success) {
			yield put(receiveGetAdminsMarketplaceAction(result));
		} else {
			yield put(receiveGetAdminsMarketplaceAction(result));
		}
	} catch (error) {
		yield put(receiveGetAdminsMarketplaceAction(error));
	}
}

export function* requestGetAdminsMarketplaceActionSaga() {
	yield takeLeading(
		requestGetAdminsMarketplaceAction,
		getAdminsMarketplaceActionWatcher
	);
}

function* getStaffsMarketplaceActionWatcher({ payload }) {
	try {
		const { marketPlaceId } = payload;
		const result = yield call(getStaffsMarketplaceApi, marketPlaceId);
		if (result.success) {
			yield put(receiveGetStaffsMarketplaceAction(result));
		} else {
			yield put(receiveGetStaffsMarketplaceAction(result));
		}
	} catch (error) {
		yield put(receiveGetStaffsMarketplaceAction(error));
	}
}

export function* requestGetStaffsMarketplaceActionSaga() {
	yield takeLeading(
		requestGetStaffsMarketplaceAction,
		getStaffsMarketplaceActionWatcher
	);
}

function* setCurrentMarketplaceWatcher({ payload }) {
	try {
		const { marketPlace, navigation, navigateTo } = payload;
		yield put(receiveSetCurrentMarketplace(marketPlace));
		if (navigation) return navigation.navigate(navigateTo);
	} catch (error) {
		yield put(receiveSetCurrentMarketplace(error));
	}
}

export function* requestGetSetCurrentMarketplaceActionSaga() {
	yield takeLeading(requestSetCurrentMarketplace, setCurrentMarketplaceWatcher);
}
