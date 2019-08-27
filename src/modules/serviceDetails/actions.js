import { createAction } from "redux-actions";

export const requestAddServiceDetailsAction = createAction(
	"REQUEST_ADD_SERVICE_DETAILS_ACTION"
);
export const receiveAddServiceDetailsAction = createAction(
	"RECEIVE_ADD_SERVICE_DETAILS_ACTION"
);

export const requestEditServiceDetailsAction = createAction(
	"REQUEST_EDIT_SERVICE_DETAILS_ACTION"
);
export const receiveEditServiceDetailsAction = createAction(
	"RECEIVE_EDIT_SERVICE_DETAILS_ACTION"
);

export const requestGetServiceDetailsAction = createAction(
	"REQUEST_GET_SERVICE_DETAILS_ACTION"
);
export const receiveGetServiceDetailsAction = createAction(
	"RECEIVE_GET_SERVICE_DETAILS_ACTION"
);

export const requestGetAdminsMarketplaceAction = createAction(
	"REQUEST_GET_ADMINS_MARKETPLACE_ACTION"
);
export const receiveGetAdminsMarketplaceAction = createAction(
	"RECEIVE_GET_ADMINS_MARKETPLACE_ACTION"
);
