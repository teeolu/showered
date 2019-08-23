import { takeLeading, call, put } from "redux-saga/effects";

import {
  addServiceDetailsApi,
  editServiceDetailsApi,
  getMarketplaceServiceDetailsApi
} from "./api";
import {
  requestAddServiceDetailsAction,
  receiveAddServiceDetailsAction,
  requestEditServiceDetailsAction,
  receiveEditServiceDetailsAction,
  requestGetServiceDetailsAction,
  receiveGetServiceDetailsAction
} from "./actions";

function* addServiceDetailsActionWatcher({ payload }) {
  try {
    const { dataToSubmit, navigation, navigateTo } = payload;
    const result = yield call(addServiceDetailsApi, dataToSubmit);
    if (result.success) {
      yield put(receiveAddServiceDetailsAction(payload));
      if (navigation) {
        navigation.navigate(navigateTo, { item: result.payload.docs });
      }
    } else {
      yield put(receiveAddServiceDetailsAction(result));
    }
  } catch (error) {
    yield put(receiveAddServiceDetailsAction(error));
  }
}

export function* requestAddServiceDetailsActionSaga() {
  yield takeLeading(
    requestAddServiceDetailsAction,
    addServiceDetailsActionWatcher
  );
}

function* editServiceDetailsActionWatcher({ payload }) {
  try {
    const { dataToSubmit, _id, navigation, navigateTo } = payload;
    const result = yield call(editServiceDetailsApi, dataToSubmit, _id);
    if (result.success) {
      yield put(receiveEditServiceDetailsAction(result));
      if (navigation) {
        navigation.navigate(navigateTo, { item: result.payload.docs[0] });
      }
      yield put(requestGetServiceDetailsAction({ marketPlaceId: _id }))
    } else {
      yield put(receiveEditServiceDetailsAction(result));
    }
  } catch (error) {
    yield put(receiveEditServiceDetailsAction(error));
  }
}

export function* requestEditServiceDetailsActionSaga() {
  yield takeLeading(
    requestEditServiceDetailsAction,
    editServiceDetailsActionWatcher
  );
}

function* getMarketplaceServiceDetailsActionWatcher({ payload }) {
  try {
    const { marketPlaceId } = payload;
    const result = yield call(getMarketplaceServiceDetailsApi, marketPlaceId);
    if (result.success) {
      yield put(receiveGetServiceDetailsAction(result));
    } else {
      yield put(receiveGetServiceDetailsAction(result));
    }
  } catch (error) {
    yield put(receiveGetServiceDetailsAction(error));
  }
}

export function* getMarketplaceServiceDetailsActionSaga() {
  yield takeLeading(
    requestGetServiceDetailsAction,
    getMarketplaceServiceDetailsActionWatcher
  );
}
