import { handleActions } from "redux-actions";

import {
	requestGetAllBrowseServiceDetailsAction,
	receiveGetAllBrowseServiceDetailsAction,
	receiveGetAllBrowseServiceDetailsFilterAction
} from "./actions";

const defaultState = {
	isLoading: false,
	request: "",
	error: false,
	allServiceDetailsData: {},
	allServiceDetailsFilterData: {}
};

export const browseStatus = {
	getAllServiceDetails: "getAllServiceDetails"
};

export const browseReducer = handleActions(
	{
		[requestGetAllBrowseServiceDetailsAction]: (state, action) => {
			return {
				...state,
				isLoading: true,
				error: false,
				request: browseStatus.getAllServiceDetails
			};
		},
		[receiveGetAllBrowseServiceDetailsAction]: {
			next(state, action) {
				const {
					payload: { category, docs, success }
				} = action;
				var existingCategory = state.allServiceDetailsData[category]
					? state.allServiceDetailsData[category]
					: {};

				const arrayToObj = category => {
					let newData = {};
					if (!category) return newData;
					if (category) {
						docs[category].map(el => {
							newData[el._id] = el;
						});
						return newData;
					}
				};
				const data = category
					? { ...existingCategory, ...arrayToObj(category) }
					: docs;
				const newState = {
					...state,
					isLoading: false,
					allServiceDetailsData: {
						...state.allServiceDetailsData,
						[category]: { ...data }
					},
					error: success,
					request: ""
				};
				return newState;
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					allServiceDetailsData: { ...state.allServiceDetailsData },
					request: "",
					error: true
				};
			}
		},
		[receiveGetAllBrowseServiceDetailsFilterAction]: {
			next(state, action) {
				const {
					payload: { category, docs, success }
				} = action;

				const arrayToObj = category => {
					let newData = {};
					if (!category) return newData;
					if (category) {
						docs[category].map(el => {
							newData[el._id] = el;
						});
						return newData;
					}
				};

				const newState = {
					...state,
					isLoading: false,
					allServiceDetailsFilterData: {
						[category]: arrayToObj(category)
					},
					error: success,
					request: ""
				};
				return newState;
			},
			throw(state, action) {
				const { payload } = action;
				return {
					...state,
					isLoading: false,
					allServiceDetailsFilterData: { ...state.allServiceDetailsFilterData },
					request: "",
					error: true
				};
			}
		}
	},
	defaultState
);
