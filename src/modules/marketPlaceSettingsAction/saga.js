import { takeLeading, call, put } from "redux-saga/effects";

import { addMarketplaceAdminApi } from "./api";
import {
	receiveAddMarketplaceAdminAction,
	requestAddMarketplaceAdminAction
} from "./actions";

function* addMarketplaceAdminActionWatcher({ payload }) {
	try {
		const { dataToSubmit, navigation, navigateTo } = payload;
		const result = yield call(addMarketplaceAdminApi, dataToSubmit);
		if (result.success) {
			yield put(receiveAddMarketplaceAdminAction(payload));
			if (navigation) {
				navigation.navigate(navigateTo, {
					item: {
						type: "success",
						title: "Invitation sent",
						text: `Your invitation has been sent succesfully to ${
							result.payload.docs.firstName
						} ${result.payload.docs.lastName}`,
						btnText: "go back",
						navigateTo: "AdminSetting"
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

export function* requestAddServiceDetailsActionSaga() {
	yield takeLeading(
		requestAddMarketplaceAdminAction,
		addMarketplaceAdminActionWatcher
	);
}
