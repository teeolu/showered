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

// Set current market place
export const requestSetCurrentMarketplace = createAction(
	"REQUEST_SET_CURRENT_MARKETPLACE"
);
export const receiveSetCurrentMarketplace = createAction(
	"RECEIVE_SET_CURRENT_MARKETPLACE"
);

// Set current market place service details
export const requestSetCurrentServiceDetails = createAction(
	"REQUEST_SET_CURRENT_SERVICE_DETAILS"
);
export const receiveSetCurrentServiceDetails = createAction(
	"RECEIVE_SET_CURRENT_SERVICE_DETAILS"
);

// get staff marketplace
export const requestGetStaffsMarketplaceAction = createAction(
	"REQUEST_GET_STAFFS_MARKETPLACE_ACTION"
);
export const receiveGetStaffsMarketplaceAction = createAction(
	"RECEIVE_GET_STAFFS_MARKETPLACE_ACTION"
);
