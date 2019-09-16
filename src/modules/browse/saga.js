import { takeLeading, call, put } from "redux-saga/effects";

import { getAllBrowseServiceDetailsApi } from "./api";
import {
	requestGetAllBrowseServiceDetailsAction,
	receiveGetAllBrowseServiceDetailsAction,
	receiveGetAllBrowseServiceDetailsFilterAction
} from "./actions";

function* getAllBrowseServiceDetailsActionWatcher({ payload }) {
	try {
		const { query, filter } = payload;
		const result = yield call(getAllBrowseServiceDetailsApi, query);
		if (result.success) {
			if (filter) {
				return yield put(
					receiveGetAllBrowseServiceDetailsFilterAction({
						...result,
						category: query.filters.category
					})
				);
			}
			yield put(
				receiveGetAllBrowseServiceDetailsAction({
					...result,
					category: query.filters.category
				})
			);
		} else {
			if (filter) {
				return yield put(receiveGetAllBrowseServiceDetailsFilterAction(result));
			}
			yield put(receiveGetAllBrowseServiceDetailsAction(result));
		}
	} catch (error) {
		if (filter) {
			return yield put(receiveGetAllBrowseServiceDetailsFilterAction(error));
		}
		yield put(receiveGetAllBrowseServiceDetailsAction(error));
	}
}

export function* getAllBrowseServiceDetailsActionSaga() {
	yield takeLeading(
		requestGetAllBrowseServiceDetailsAction,
		getAllBrowseServiceDetailsActionWatcher
	);
}
