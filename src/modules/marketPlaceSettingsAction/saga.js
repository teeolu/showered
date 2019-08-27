import { takeLeading, call, put } from "redux-saga/effects";

import {
	addMarketplaceAdminApi,
	removeMarketplaceAdminApi,
	disableMarketplaceAdminApi
} from "./api";
import {
	receiveAddMarketplaceAdminAction,
	requestAddMarketplaceAdminAction,
	receiveRemoveMarketplaceAdminAction,
	requestRemoveMarketplaceAdminAction,
	receiveDisableMarketplaceAdminAction,
	requestDisableMarketplaceAdminAction
} from "./actions";
import { requestGetAdminsMarketplaceAction } from "../MarketplaceDetails/actions";

function* disableMarketplaceAdminActionWatcher({ payload }) {
	try {
		const { adminId, marketPlaceId } = payload;
		const result = yield call(
			disableMarketplaceAdminApi,
			adminId,
			marketPlaceId
		);
		if (result.success) {
			yield put(requestGetAdminsMarketplaceAction({ marketPlaceId }));
			yield put(receiveDisableMarketplaceAdminAction(payload));
		} else {
			yield put(receiveDisableMarketplaceAdminAction(result));
		}
	} catch (error) {
		yield put(receiveDisableMarketplaceAdminAction(error));
	}
}

export function* requestDisableServiceDetailsActionSaga() {
	yield takeLeading(
		requestDisableMarketplaceAdminAction,
		disableMarketplaceAdminActionWatcher
	);
}

function* removeMarketplaceAdminActionWatcher({ payload }) {
	try {
		const { adminId, marketPlaceId } = payload;
		const result = yield call(
			removeMarketplaceAdminApi,
			adminId,
			marketPlaceId
		);
		if (result.success) {
			yield put(requestGetAdminsMarketplaceAction({ marketPlaceId }));
			yield put(receiveRemoveMarketplaceAdminAction(payload));
		} else {
			yield put(receiveRemoveMarketplaceAdminAction(result));
		}
	} catch (error) {
		yield put(receiveRemoveMarketplaceAdminAction(error));
	}
}

export function* requestRemoveServiceDetailsActionSaga() {
	yield takeLeading(
		requestRemoveMarketplaceAdminAction,
		removeMarketplaceAdminActionWatcher
	);
}

function* addMarketplaceAdminActionWatcher({ payload }) {
	try {
		const { dataToSubmit, navigation, navigateTo, data } = payload;
		const result = yield call(addMarketplaceAdminApi, dataToSubmit);
		if (result.success) {
			yield put(receiveAddMarketplaceAdminAction(payload));
			if (navigation) {
				navigation.navigate(navigateTo, {
					item: {
						type: "success",
						title: "Invitation sent",
						text: `Your invitation has been sent succesfully to ${result.payload.docs.firstName} ${result.payload.docs.lastName}`,
						btnText: "go back",
						navigateTo: "AdminSetting",
						data
					}
				});
			}
		} else {
			yield put(receiveAddMarketplaceAdminAction(result));
		}
	} catch (error) {
		yield put(receiveAddMarketplaceAdminAction(error));
	}
}

export function* requestAddMarketplaceServiceDetailsActionSaga() {
	yield takeLeading(
		requestAddMarketplaceAdminAction,
		addMarketplaceAdminActionWatcher
	);
}
