import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";

import { authReducer } from "./auth/reducers";
import { imageUploadReducer } from "./imageUpload/reducers";
import { marketplaceReducer } from "./marketPlace/reducers";
import { serviceDetailsReducer } from "./serviceDetails/reducers";
import { marketPlaceSettingsReducer } from "./marketPlaceSettingsAction/reducers";

import * as authSaga from "./auth/saga";
import * as uploadImageActionSaga from "./imageUpload/saga";
import * as addMarketplaceSaga from "./marketPlace/saga";
import * as serviceDetailsSaga from "./serviceDetails/saga";
import * as marketPlaceSettingsSaga from "./marketPlaceSettingsAction/saga";

export const rootReducer = combineReducers({
	authReducer,
	imageUploadReducer,
	marketplaceReducer,
	serviceDetailsReducer,
	marketPlaceSettingsReducer
});

export function* rootSaga() {
	yield all(
		[
			...Object.values(authSaga),
			...Object.values(uploadImageActionSaga),
			...Object.values(addMarketplaceSaga),
			...Object.values(serviceDetailsSaga),
			...Object.values(marketPlaceSettingsSaga)
		].map(fork)
	);
}
