import { createAction } from 'redux-actions';

export const requestImageUploadAction = createAction('REQUEST_IMAGE_UPLOAD');
export const receiveImageUploadAction = createAction('RECEIVE_IMAGE_UPLOAD');

export const requestRemoveImageUploadAction = createAction('REQUEST_REMOVE_IMAGE_UPLOAD');
export const receiveRemoveImageUploadAction = createAction('RECEIVE_REMOVE_IMAGE_UPLOAD');