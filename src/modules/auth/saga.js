import { takeLeading, call, put } from 'redux-saga/effects';

import { signupUserApi, loginUserApi, userinfoApi } from './api';
import {
    requestSignupAction,
    receiveSignupAction,
    receiveLoginAction,
    requestLoginAction,
    requestUserinfoAction,
    receiveUserinfoAction,
} from './action';
import { setToken } from '../../Auth';

function* signupActionWatcher({ payload }) {
    try {
        const { email, firstName, password, lastName, navigation, navigateTo } = payload;
        const result = yield call(signupUserApi, email, firstName, lastName, password);
        if (result.success) {
            yield put(receiveSignupAction(payload));
            if (navigation) {
                navigation.navigate(navigateTo)
            }
        } else {
            yield put(receiveSignupAction(result));
        }
    } catch (error) {
        yield put(receiveSignupAction(error));
    }
}

export function* requestSignupActionSaga() {
    yield takeLeading(requestSignupAction, signupActionWatcher)
}

function* loginActionWatcher({ payload }) {
    try {
        const { email, password, navigation, navigateTo } = payload;
        const result = yield call(loginUserApi, email, password);
        if (result.success) {
            if(result.token && result.token.length > 1){
                setToken(result.token);
            } else {
                throw new Error('Invalid token')
            }
            yield put(requestUserinfoAction({ navigation, navigateTo }));
            yield put(receiveLoginAction(result));
        } else {
            yield put(receiveLoginAction(result));
        }
    } catch (error) {
        yield put(receiveLoginAction(error));
    }
}

export function* loginActionSaga() {
    yield takeLeading(requestLoginAction, loginActionWatcher)
}

function* userinfoActionWatcher({ payload }) {
    try {
        const { token, navigation, navigateTo } = payload;
        const result = yield call(userinfoApi, token);

        if (result.success) {
            yield put(receiveUserinfoAction(result));
            navigation.navigate(navigateTo)
        } else {
            navigation.navigate('Login')
            const error = result instanceof Error ? result : new Error(result.message ? result.message : `HTTP Error: status = ${result.status}`);
            yield put(receiveLoginAction(error));
        }
    } catch (error) {
        yield put(receiveLoginAction(error));
    }
}

export function* userinfoActionSaga() {
    yield takeLeading(requestUserinfoAction, userinfoActionWatcher)
}