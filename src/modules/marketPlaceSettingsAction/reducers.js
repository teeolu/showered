import { handleActions } from "redux-actions";

import {
	requestAddMarketplaceAdminAction,
	receiveAddMarketplaceAdminAction,
	requestRemoveMarketplaceAdminAction,
	receiveRemoveMarketplaceAdminAction,
	requestDisableMarketplaceAdminAction,
	receiveDisableMarketplaceAdminAction
} from "./actions";

const defaultState = {
	isLoading: false,
	request: "",
	error: false,
	errorMessage: ""
};

export const marketPlaceSettingsStatus = {
	addMarketplaceAdmin: "addMarketplaceAdmin",
	removeMarketplaceAdmin: "removeMarketplaceAdmin",
	disableMarketplaceAdmin: "disableMarketplaceAdmin"
};

export const marketPlaceSettingsReducer = handleActions(
	{
		[requestAddMarketplaceAdminAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketPlaceSettingsStatus.addMarketplaceAdmin
			};
		},
		[receiveAddMarketplaceAdminAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					error: false,
					request: marketPlaceSettingsStatus.addMarketplaceAdmin
				};
			},
			throw(state, action) {
				const {
					payload: { payload }
				} = action;
				return {
					...state,
					isLoading: false,
					errorMessage: payload ? payload.message : "",
					request: marketPlaceSettingsStatus.addMarketplaceAdmin,
					error: true
				};
			}
		},
		[requestRemoveMarketplaceAdminAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketPlaceSettingsStatus.addMarketplaceAdmin
			};
		},
		[receiveRemoveMarketplaceAdminAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					error: false,
					request: marketPlaceSettingsStatus.removeMarketplaceAdmin
				};
			},
			throw(state, action) {
				const {
					payload: { payload }
				} = action;
				return {
					...state,
					isLoading: false,
					errorMessage: payload ? payload.message : "",
					request: marketPlaceSettingsStatus.removeMarketplaceAdmin,
					error: true
				};
			}
		},
		[requestDisableMarketplaceAdminAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketPlaceSettingsStatus.disableMarketplaceAdmin
			};
		},
		[receiveDisableMarketplaceAdminAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					error: false,
					request: marketPlaceSettingsStatus.disableMarketplaceAdmin
				};
			},
			throw(state, action) {
				const {
					payload: { payload }
				} = action;
				return {
					...state,
					isLoading: false,
					errorMessage: payload ? payload.message : "",
					request: marketPlaceSettingsStatus.disableMarketplaceAdmin,
					error: true
				};
			}
		}
	},
	defaultState
);
