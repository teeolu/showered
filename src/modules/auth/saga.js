import { takeLeading, call, put } from 'redux-saga/effects';

import {

} from './api';
import {
    requestSignupAction,
    receiveSignupAction,
    receiveLoginAction,
    requestLoginAction,
} from './action';

function* signupActionWatcher({ payload }){
    const { email, firstName, password, lastName, navigation, navigateTo } = payload;
    yield put(receiveSignupAction(payload));
    if(navigation){
        navigation.navigate(navigateTo)
    }
}

export function* requestSignupActionSaga(){
    yield takeLeading(requestSignupAction, signupActionWatcher)
}

function* loginActionWatcher({ payload }){
    const { email, password, navigation, navigateTo } = payload;
    yield put(receiveLoginAction(payload));
    if(navigation){
        navigation.navigate(navigateTo)
    }
}

export function* loginActionSaga(){
    yield takeLeading(requestLoginAction, loginActionWatcher)
}