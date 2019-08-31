import { handleActions } from "redux-actions";

import {
	requestAddMarketplaceAdminAction,
	receiveAddMarketplaceAdminAction,
	requestRemoveMarketplaceAdminAction,
	receiveRemoveMarketplaceAdminAction,
	requestRemovePendingMarketplaceAdminAction,
	receiveRemovePendingMarketplaceAdminAction,
	requestRemovePendingMarketplaceStaffAction,
	receiveRemovePendingMarketplaceStaffAction,
	requestDisableMarketplaceAdminAction,
	receiveDisableMarketplaceAdminAction,
	requestRemoveMarketplaceStaffAction,
	receiveRemoveMarketplaceStaffAction,
	requestDisableMarketplaceStaffAction,
	receiveDisableMarketplaceStaffAction,
	receiveAddMarketplaceStaffAction,
	requestAddMarketplaceStaffAction
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
	removePendingMarketplaceAdmin: "removePendingMarketplaceAdmin",
	removePendingMarketplaceStaff: "removePendingMarketplaceStaff",
	disableMarketplaceAdmin: "disableMarketplaceAdmin",
	addMarketplaceStaff: "addMarketplaceStaff",
	removeMarketplaceStaff: "removeMarketplaceStaff",
	disableMarketplaceStaff: "disableMarketplaceStaff"
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
				request: marketPlaceSettingsStatus.removeMarketplaceAdmin
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
		[requestRemovePendingMarketplaceAdminAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketPlaceSettingsStatus.removePendingMarketplaceAdmin
			};
		},
		[receiveRemovePendingMarketplaceAdminAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					error: false,
					request: marketPlaceSettingsStatus.removePendingMarketplaceAdmin
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
					request: marketPlaceSettingsStatus.removePendingMarketplaceAdmin,
					error: true
				};
			}
		},
		[requestRemovePendingMarketplaceStaffAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketPlaceSettingsStatus.removePendingMarketplaceStaff
			};
		},
		[receiveRemovePendingMarketplaceStaffAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					error: false,
					request: marketPlaceSettingsStatus.removePendingMarketplaceStaff
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
					request: marketPlaceSettingsStatus.removePendingMarketplaceStaff,
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
		},
		[requestAddMarketplaceStaffAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketPlaceSettingsStatus.addMarketplaceStaff
			};
		},
		[receiveAddMarketplaceStaffAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					error: false,
					request: marketPlaceSettingsStatus.addMarketplaceStaff
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
					request: marketPlaceSettingsStatus.addMarketplaceStaff,
					error: true
				};
			}
		},
		[requestRemoveMarketplaceStaffAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketPlaceSettingsStatus.addMarketplaceStaff
			};
		},
		[receiveRemoveMarketplaceStaffAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					error: false,
					request: marketPlaceSettingsStatus.removeMarketplaceStaff
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
					request: marketPlaceSettingsStatus.removeMarketplaceStaff,
					error: true
				};
			}
		},
		[requestDisableMarketplaceStaffAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketPlaceSettingsStatus.disableMarketplaceStaff
			};
		},
		[receiveDisableMarketplaceStaffAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					error: false,
					request: marketPlaceSettingsStatus.disableMarketplaceStaff
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
					request: marketPlaceSettingsStatus.disableMarketplaceStaff,
					error: true
				};
			}
		}
	},
	defaultState
);
