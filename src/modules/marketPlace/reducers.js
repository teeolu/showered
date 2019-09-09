import { handleActions } from "redux-actions";

import {
	receiveAddMarketplaceAction,
	requestAddMarketplaceAction,
	requestEditMarketplaceAction,
	receiveEditMarketplaceAction,
	requestGetUserMarketplaceAction,
	receiveGetUserMarketplaceAction,
	requestGetUserMarketplacePendingAdminAction,
	receiveGetUserMarketplacePendingAdminAction,
	requestGetUserMarketplacePendingStaffAction,
	receiveGetUserMarketplacePendingStaffAction,
	receiveDisableMarketplaceAction,
	requestDisableMarketplaceAction
} from "./actions";

const defaultState = {
	isLoading: false,
	request: "",
	userMarketplaceData: [],
	marketPlacePendingAdmins: [],
	getMarketPlacePendingStaff: [],
	error: false
};

export const marketplaceStatus = {
	addMarketPlace: "addMarketPlace",
	getMarketPlace: "getMarketPlace",
	marketPlacePendingAdmins: "marketPlacePendingAdmins",
	disableMarketplace: "disableMarketplace"
};

export const marketplaceReducer = handleActions(
	{
		[requestAddMarketplaceAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketplaceStatus.addMarketPlace
			};
		},
		[receiveAddMarketplaceAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					error: payload.success,
					request: ""
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: "",
					error: true
				};
			}
		},
		[requestEditMarketplaceAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketplaceStatus.addMarketPlace
			};
		},
		[receiveEditMarketplaceAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: ""
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: "",
					error: true
				};
			}
		},
		[requestGetUserMarketplaceAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketplaceStatus.getMarketPlace
			};
		},
		[receiveGetUserMarketplaceAction]: {
			next(state, action) {
				const { payload } = action;

				return {
					...state,
					isLoading: false,
					userMarketplaceData: payload.docs,
					request: ""
				};
			},
			throw(state, action) {
				const { payload } = action;

				return {
					...state,
					isLoading: false,
					userMarketplaceData: [],
					request: "",
					error: true
				};
			}
		},
		[requestGetUserMarketplacePendingStaffAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketplaceStatus.getMarketPlacePendingStaff
			};
		},
		[receiveGetUserMarketplacePendingStaffAction]: {
			next(state, action) {
				const { payload } = action;

				return {
					...state,
					isLoading: false,
					marketPlacePendingStaffs: payload.docs,
					request: ""
				};
			},
			throw(state, action) {
				const { payload } = action;

				return {
					...state,
					isLoading: false,
					marketPlacePendingStaffs: [],
					request: "",
					error: true
				};
			}
		},
		[requestGetUserMarketplacePendingAdminAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketplaceStatus.getMarketPlacePendingAdmin
			};
		},
		[receiveGetUserMarketplacePendingAdminAction]: {
			next(state, action) {
				const { payload } = action;

				return {
					...state,
					isLoading: false,
					marketPlacePendingAdmins: payload.docs,
					request: ""
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					marketPlacePendingAdmins: [],
					request: "",
					error: true
				};
			}
		},
		[requestDisableMarketplaceAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: marketplaceStatus.disableMarketplace
			};
		},
		[receiveDisableMarketplaceAction]: {
			next(state, action) {
				const { payload } = action;

				return {
					...state,
					isLoading: false,
					request: "",
					error: payload.success
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: payload.success,
					request: "",
					error: payload.success
				};
			}
		}
	},
	defaultState
);
