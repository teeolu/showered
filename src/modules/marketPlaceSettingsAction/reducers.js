import { handleActions } from "redux-actions";

import {
	requestAddMarketplaceAdminAction,
	receiveAddMarketplaceAdminAction
} from "./actions";

const defaultState = {
	isLoading: false,
	request: "",
	error: false
};

export const marketPlaceSettingsStatus = {
	addMarketplaceAdmin: "addMarketplaceAdmin",
	removeMarketplaceAdmin: "removeMarketplaceAdmin"
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
				const {
					payload: { payload }
				} = action;
				return {
					...state,
					isLoading: false,
					error: true,
					errorMessage: payload.message,
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
					errorMessage: payload.message,
					request: marketPlaceSettingsStatus.addMarketplaceAdmin,
					error: true
				};
			}
		}
	},
	defaultState
);
