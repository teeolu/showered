import { handleActions, combineActions } from 'redux-actions';

import {
	requestSignupAction,
	receiveSignupAction,
	requestLoginAction,
	receiveLoginAction,
	receiveUserinfoAction
} from './action';

const defaultState = {
	isLoading: false
}

export const authStatus = {
	login: 'login',
	signup: 'signup'
}

export const authReducer = handleActions(
	{
		[requestSignupAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				request: authStatus.signup
			};
		},
		[receiveSignupAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: authStatus.signup
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: authStatus.signup
				};
			}
		},
		[requestLoginAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				request: authStatus.login
			};
		},
		[receiveLoginAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: authStatus.login,
					error: !payload.success || false
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: authStatus.login,
					// error: !payload.success || false
				};
			}
		},
		[receiveUserinfoAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					userdata: {
						firstName: payload.firstName,
						lastName: payload.lastName,
						email: payload.email,
						_id: payload._id
					}
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					...payload
				};
			}
		}
	},
	defaultState
);