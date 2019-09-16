import { takeLeading, call, put } from "redux-saga/effects";

import {
	addMarketplaceAdminApi,
	removeMarketplaceAdminApi,
	disableMarketplaceAdminApi,
	addMarketplaceStaffApi,
	removeMarketplaceStaffApi,
	disableMarketplaceStaffApi,
	removePendingMarketplaceAdminApi,
	removePendingMarketplaceStaffApi
} from "./api";
import {
	receiveAddMarketplaceAdminAction,
	requestAddMarketplaceAdminAction,
	receiveRemoveMarketplaceAdminAction,
	requestRemoveMarketplaceAdminAction,
	requestRemovePendingMarketplaceAdminAction,
	receiveRemovePendingMarketplaceAdminAction,
	requestRemovePendingMarketplaceStaffAction,
	receiveRemovePendingMarketplaceStaffAction,
	receiveDisableMarketplaceAdminAction,
	requestDisableMarketplaceAdminAction,
	requestRemoveMarketplaceStaffAction,
	receiveRemoveMarketplaceStaffAction,
	requestDisableMarketplaceStaffAction,
	receiveDisableMarketplaceStaffAction,
	receiveAddMarketplaceStaffAction,
	requestAddMarketplaceStaffAction
} from "./actions";
import {
	requestGetAdminsMarketplaceAction,
	requestGetStaffsMarketplaceAction
} from "../MarketplaceServiceDetails/actions";
import {
	requestGetUserMarketplacePendingAdminAction,
	requestGetUserMarketplacePendingStaffAction
} from "../marketPlace/actions";

// Admin saga
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

export function* requestDisableMarketplaceAdminActionSaga() {
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

export function* requestRemoveMarketplaceAdminActionSaga() {
	yield takeLeading(
		requestRemoveMarketplaceAdminAction,
		removeMarketplaceAdminActionWatcher
	);
}

function* removePendingMarketplaceAdminActionWatcher({ payload }) {
	try {
		const { userId, marketPlaceId } = payload;
		const result = yield call(
			removePendingMarketplaceAdminApi,
			userId,
			marketPlaceId
		);
		if (result.success) {
			yield put(requestGetUserMarketplacePendingAdminAction({ marketPlaceId }));
			yield put(receiveRemovePendingMarketplaceAdminAction(payload));
		} else {
			yield put(receiveRemovePendingMarketplaceAdminAction(result));
		}
	} catch (error) {
		yield put(receiveRemovePendingMarketplaceAdminAction(error));
	}
}

export function* requestRemovePendingMarketplaceAdminActionSaga() {
	yield takeLeading(
		requestRemovePendingMarketplaceAdminAction,
		removePendingMarketplaceAdminActionWatcher
	);
}

function* removePendingMarketplaceStaffActionWatcher({ payload }) {
	try {
		const { userId, marketPlaceId } = payload;
		const result = yield call(
			removePendingMarketplaceStaffApi,
			userId,
			marketPlaceId
		);
		if (result.success) {
			yield put(requestGetUserMarketplacePendingStaffAction({ marketPlaceId }));
			yield put(receiveRemovePendingMarketplaceStaffAction(payload));
		} else {
			yield put(receiveRemovePendingMarketplaceStaffAction(result));
		}
	} catch (error) {
		yield put(receiveRemovePendingMarketplaceStaffAction(error));
	}
}

export function* requestRemovePendingMarketplaceStaffActionSaga() {
	yield takeLeading(
		requestRemovePendingMarketplaceStaffAction,
		removePendingMarketplaceStaffActionWatcher
	);
}

function* addMarketplaceAdminActionWatcher({ payload }) {
	try {
		const { dataToSubmit, navigation, navigateTo, data } = payload;
		const result = yield call(addMarketplaceAdminApi, dataToSubmit);
		if (result.success) {
			yield put(
				requestGetUserMarketplacePendingAdminAction({
					marketPlaceId: dataToSubmit.marketPlaceId
				})
			);
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

export function* requestAddMarketplaceAdminActionSaga() {
	yield takeLeading(
		requestAddMarketplaceAdminAction,
		addMarketplaceAdminActionWatcher
	);
}

// Staff saga
function* disableMarketplaceStaffActionWatcher({ payload }) {
	try {
		const { staffId, marketPlaceId } = payload;
		const result = yield call(
			disableMarketplaceStaffApi,
			staffId,
			marketPlaceId
		);
		if (result.success) {
			yield put(requestGetStaffsMarketplaceAction({ marketPlaceId }));
			yield put(receiveDisableMarketplaceStaffAction(payload));
		} else {
			yield put(receiveDisableMarketplaceStaffAction(result));
		}
	} catch (error) {
		yield put(receiveDisableMarketplaceStaffAction(error));
	}
}

export function* requestDisableStaffActionSaga() {
	yield takeLeading(
		requestDisableMarketplaceStaffAction,
		disableMarketplaceStaffActionWatcher
	);
}

function* removeMarketplaceStaffActionWatcher({ payload }) {
	try {
		const { staffId, marketPlaceId } = payload;
		const result = yield call(
			removeMarketplaceStaffApi,
			staffId,
			marketPlaceId
		);
		if (result.success) {
			yield put(requestGetStaffsMarketplaceAction({ marketPlaceId }));
			yield put(receiveRemoveMarketplaceStaffAction(payload));
		} else {
			yield put(receiveRemoveMarketplaceStaffAction(result));
		}
	} catch (error) {
		yield put(receiveRemoveMarketplaceStaffAction(error));
	}
}

export function* requestRemoveStaffActionSaga() {
	yield takeLeading(
		requestRemoveMarketplaceStaffAction,
		removeMarketplaceStaffActionWatcher
	);
}

function* addMarketplaceStaffActionWatcher({ payload }) {
	try {
		const { dataToSubmit, navigation, navigateTo, data } = payload;
		const result = yield call(addMarketplaceStaffApi, dataToSubmit);
		if (result.success) {
			yield put(receiveAddMarketplaceStaffAction(payload));
			if (navigation) {
				navigation.navigate(navigateTo, {
					item: {
						type: "success",
						title: "Invitation sent",
						text: `Your invitation has been sent succesfully to ${result.payload.docs.firstName} ${result.payload.docs.lastName}`,
						btnText: "go back",
						navigateTo: "StaffSetting",
						data
					}
				});
			}
		} else {
			yield put(receiveAddMarketplaceStaffAction(result));
		}
	} catch (error) {
		yield put(receiveAddMarketplaceStaffAction(error));
	}
}

export function* requestAddMarketplaceStaffActionSaga() {
	yield takeLeading(
		requestAddMarketplaceStaffAction,
		addMarketplaceStaffActionWatcher
	);
}
