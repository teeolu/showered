import { handleActions } from 'redux-actions';

import {
    requestImageUploadAction,
    receiveImageUploadAction
} from './actions';

const defaultState = {
    isLoading: false
}

export const imageUploadStatus = {
    imageUpload: 'imageUpload',
}

export const imageUploadReducer = handleActions(
    {
        [requestImageUploadAction]: (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: false,
                request: imageUploadStatus.imageUpload
            };
        },
        [receiveImageUploadAction]: {
            next(state, action) {
                const { payload } = action;
                return {
                    ...state,
                    isLoading: false,
                    request: imageUploadStatus.imageUpload,
                    imageUrl: { 
                        secureUrl: payload.secure_url, 
                        publicId: payload.public_id 
                    }
                };
            },
            throw(state, action) {
                const { payload } = action;
                return {
                    ...state,
                    isLoading: false,
                    request: imageUploadStatus.imageUpload,
                    error: true
                };
            }
        },
    }, 
    defaultState
);