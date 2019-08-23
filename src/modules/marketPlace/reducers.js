import { handleActions } from "redux-actions";

import {
  receiveAddMarketplaceAction,
  requestAddMarketplaceAction,
  requestEditMarketplaceAction,
  receiveEditMarketplaceAction,
  requestGetUserMarketplaceAction,
  receiveGetUserMarketplaceAction
} from "./actions";

const defaultState = {
  isLoading: false,
  request: "",
  userMarketplaceData: [],
  error: false
};

export const marketplaceStatus = {
  addMarketPlace: "addMarketPlace",
  getMarketPlace: "getMarketPlace"
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
    }
  },
  defaultState
);
