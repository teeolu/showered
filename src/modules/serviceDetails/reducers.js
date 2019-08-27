import { handleActions } from "redux-actions";

import {
	requestAddServiceDetailsAction,
	receiveAddServiceDetailsAction,
	requestEditServiceDetailsAction,
	receiveEditServiceDetailsAction,
	requestGetServiceDetailsAction,
	receiveGetServiceDetailsAction,
	requestGetAdminsMarketplaceAction,
	receiveGetAdminsMarketplaceAction
} from "./actions";

const defaultState = {
	isLoading: false,
	request: "",
	error: false,
	marketplaceServiceDetailsData: [],
	marketPlaceAdmins: []
};

export const serviceDetailsStatus = {
	addServiceDetails: "addServiceDetails",
	getServiceDetails: "getServiceDetails",
	getAdminsMarketPlace: "getAdminsMarketPlace"
};

export const serviceDetailsReducer = handleActions(
	{
		[requestAddServiceDetailsAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: serviceDetailsStatus.addServiceDetails
			};
		},
		[receiveAddServiceDetailsAction]: {
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
		[requestEditServiceDetailsAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: serviceDetailsStatus.addServiceDetails
			};
		},
		[receiveEditServiceDetailsAction]: {
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
		[requestEditServiceDetailsAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: serviceDetailsStatus.addServiceDetails
			};
		},
		[requestGetServiceDetailsAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: serviceDetailsStatus.getServiceDetails
			};
		},
		[receiveGetServiceDetailsAction]: {
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
		}
	},
	defaultState
);
