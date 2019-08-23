import { handleActions } from "redux-actions";

import {
  requestAddServiceDetailsAction,
  receiveAddServiceDetailsAction,
  requestEditServiceDetailsAction,
  receiveEditServiceDetailsAction,
  requestGetServiceDetailsAction,
  receiveGetServiceDetailsAction
} from "./actions";

const defaultState = {
  isLoading: false,
  request: "",
  error: false,
  marketplaceServiceDetailsData: []
};

export const serviceDetailsStatus = {
  addServiceDetails: "addServiceDetails",
  getServiceDetails: "getServiceDetails"
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
    }
  },
  defaultState
);
