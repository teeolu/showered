import { handleActions } from 'redux-actions';

import {
    requestImageUploadAction,
    receiveImageUploadAction,
    requestRemoveImageUploadAction,
    receiveRemoveImageUploadAction
} from './actions';

const defaultState = {
    isLoading: false,
    request: '',
    error: false
}

export const imageUploadStatus = {
    imageUpload: 'imageUpload',
    removeUploadImage: 'removeUploadImage'
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
        [requestRemoveImageUploadAction]: (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: false,
                request: imageUploadStatus.removeUploadImage
            };
        },
        [receiveRemoveImageUploadAction]: {
            next(state, action) {
                const { payload } = action;
                return {
                    ...state,
                    isLoading: false,
                    deletedPublicId: payload.public_id,
                    request: imageUploadStatus.removeUploadImage
                };
            },
            throw(state, action) {
                const { payload } = action;
                return {
                    ...state,
                    isLoading: false,
                    request: imageUploadStatus.removeUploadImage,
                    error: true
                };
            }
        },
    },
    defaultState
);