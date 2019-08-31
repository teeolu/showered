import { handleActions } from "redux-actions";

import {
	requestAddMarketplaceServiceDetailsAction,
	receiveAddMarketplaceServiceDetailsAction,
	requestEditMarketplaceServiceDetailsAction,
	receieveEditMarketplaceServiceDetailsAction,
	requestGetMarketplaceDetailsAction,
	receiveGetMarketplaceDetailsAction,
	requestGetAdminsMarketplaceAction,
	receiveGetAdminsMarketplaceAction,
	requestGetStaffsMarketplaceAction,
	receiveGetStaffsMarketplaceAction,
	receiveSetCurrentMarketplace
} from "./actions";

const defaultState = {
	isLoading: false,
	request: "",
	error: false,
	marketplaceServiceDetailsData: [],
	marketPlaceAdmins: [],
	marketPlaceStaffs: [],
	currentMarketplace: {}
};

export const serviceDetailsStatus = {
	addServiceDetails: "addServiceDetails",
	getServiceDetails: "getServiceDetails",
	getAdminsMarketPlace: "getAdminsMarketPlace",
	getStaffsMarketPlace: "getStaffsMarketPlace"
};

export const serviceDetailsReducer = handleActions(
	{
		[requestAddMarketplaceServiceDetailsAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: serviceDetailsStatus.addServiceDetails
			};
		},
		[receiveAddMarketplaceServiceDetailsAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: serviceDetailsStatus.addServiceDetails
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: serviceDetailsStatus.addServiceDetails,
					error: true
				};
			}
		},
		[requestEditMarketplaceServiceDetailsAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: serviceDetailsStatus.addServiceDetails
			};
		},
		[receieveEditMarketplaceServiceDetailsAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: serviceDetailsStatus.addServiceDetails
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					request: serviceDetailsStatus.addServiceDetails,
					error: true
				};
			}
		},
		[requestGetMarketplaceDetailsAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: serviceDetailsStatus.getServiceDetails
			};
		},
		[receiveGetMarketplaceDetailsAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					marketplaceServiceDetailsData: payload.docs,
					request: serviceDetailsStatus.getServiceDetails
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					marketplaceServiceDetailsData: [],
					request: serviceDetailsStatus.getServiceDetails,
					error: true
				};
			}
		},
		[requestGetAdminsMarketplaceAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: serviceDetailsStatus.getAdminsMarketPlace
			};
		},
		[receiveGetAdminsMarketplaceAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					marketPlaceAdmins: payload.docs,
					request: serviceDetailsStatus.getAdminsMarketPlace
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					marketPlaceAdmins: [],
					request: serviceDetailsStatus.getAdminsMarketPlace,
					error: true
				};
			}
		},
		[requestGetStaffsMarketplaceAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: serviceDetailsStatus.getAdminsMarketPlace
			};
		},
		[receiveGetStaffsMarketplaceAction]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					marketPlaceStaffs: payload.docs,
					request: serviceDetailsStatus.getAdminsMarketPlace
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					marketPlaceStaffs: [],
					request: serviceDetailsStatus.getAdminsMarketPlace,
					error: true
				};
			}
		},
		[receiveSetCurrentMarketplace]: {
			next(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					currentMarketplace: payload
				};
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					currentMarketplace: {},
					error: true
				};
			}
		}
	},
	defaultState
);
