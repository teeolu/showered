import { handleActions } from 'redux-actions';

import {
    receiveAddMarketplaceAction,
    requestAddMarketplaceAction
} from './actions';

const defaultState = {
    isLoading: false,
    request: '',
    error: false
}

export const marketplaceStatus = {
    addMarketPlace: 'addMarketPlace',
}

export const addMarketplaceReducer = handleActions(
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
        }
    },
    defaultState
);
