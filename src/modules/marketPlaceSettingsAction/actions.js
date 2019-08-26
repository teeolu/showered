import { createAction } from "redux-actions";

export const requestAddMarketplaceAdminAction = createAction(
	"REQUEST_ADD_MARKETPLACE_ADMIN_ACTION"
);
export const receiveAddMarketplaceAdminAction = createAction(
	"RECEIVE_ADD_MARKETPLACE_ADMIN_ACTION"
);

export const requestRemoveMarketplaceAdminAction = createAction(
	"REQUEST_REMOVE_MARKETPLACE_ADMIN_ACTION"
);
export const receiveRemoveMarketplaceAdminAction = createAction(
	"RECEIVE_REMOVE_MARKETPLACE_ADMIN_ACTION"
);

export const requestDisableMarketplaceAdminAction = createAction(
	"REQUEST_DISABLE_MARKETPLACE_ADMIN_ACTION"
);
export const receiveDisableMarketplaceAdminAction = createAction(
	"RECEIVE_DISABLE_MARKETPLACE_ADMIN_ACTION"
);
