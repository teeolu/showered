import { createAction } from "redux-actions";

export const requestAddMarketplaceServiceDetailsAction = createAction(
	"REQUEST_ADD_SERVICE_DETAILS_ACTION"
);
export const receiveAddMarketplaceServiceDetailsAction = createAction(
	"RECEIVE_ADD_SERVICE_DETAILS_ACTION"
);

export const requestEditMarketplaceServiceDetailsAction = createAction(
	"REQUEST_EDIT_SERVICE_DETAILS_ACTION"
);
export const receieveEditMarketplaceServiceDetailsAction = createAction(
	"RECEIVE_EDIT_SERVICE_DETAILS_ACTION"
);

export const requestGetMarketplaceDetailsAction = createAction(
	"REQUEST_GET_MARKETPLACE_DETAILS_ACTION"
);
export const receiveGetMarketplaceDetailsAction = createAction(
	"RECEIVE_GET_MARKETPLACE_DETAILS_ACTION"
);

export const requestGetAdminsMarketplaceAction = createAction(
	"REQUEST_GET_ADMINS_MARKETPLACE_ACTION"
);
export const receiveGetAdminsMarketplaceAction = createAction(
	"RECEIVE_GET_ADMINS_MARKETPLACE_ACTION"
);
