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
	receiveGetUserMarketplacePendingStaffAction
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
	marketPlacePendingAdmins: "marketPlacePendingAdmins"
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
					request: marketplaceStatus.addMarketPlace
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: marketplaceStatus.addMarketPlace,
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
					request: marketplaceStatus.addMarketPlace
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: marketplaceStatus.addMarketPlace,
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
					request: marketplaceStatus.getMarketPlace
				};
			},
			throw(state, action) {
				const { payload } = action;

				return {
					...state,
					isLoading: false,
					userMarketplaceData: [],
					request: marketplaceStatus.getMarketPlace,
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
					request: marketplaceStatus.getMarketPlacePendingStaff
				};
			},
			throw(state, action) {
				const { payload } = action;

				return {
					...state,
					isLoading: false,
					marketPlacePendingStaffs: [],
					request: marketplaceStatus.getMarketPlacePendingStaff,
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
					request: marketplaceStatus.getMarketPlacePendingAdmin
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					marketPlacePendingAdmins: [],
					request: marketplaceStatus.getMarketPlacePendingAdmin,
					error: true
				};
			}
		}
	},
	defaultState
);
