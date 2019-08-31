import { createAction } from "redux-actions";

// Admin Actions
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
export const requestRemovePendingMarketplaceAdminAction = createAction(
	"REQUEST_REMOVE_PENDING_MARKETPLACE_ADMIN_ACTION"
);
export const receiveRemovePendingMarketplaceAdminAction = createAction(
	"RECEIVE_REMOVE_PENDING_MARKETPLACE_ADMIN_ACTION"
);

// Staff Actions
export const requestAddMarketplaceStaffAction = createAction(
	"REQUEST_ADD_MARKETPLACE_STAFF_ACTION"
);
export const receiveAddMarketplaceStaffAction = createAction(
	"RECEIVE_ADD_MARKETPLACE_STAFF_ACTION"
);

export const requestRemoveMarketplaceStaffAction = createAction(
	"REQUEST_REMOVE_MARKETPLACE_STAFF_ACTION"
);
export const receiveRemoveMarketplaceStaffAction = createAction(
	"RECEIVE_REMOVE_MARKETPLACE_STAFF_ACTION"
);

export const requestDisableMarketplaceStaffAction = createAction(
	"REQUEST_DISABLE_MARKETPLACE_STAFF_ACTION"
);
export const receiveDisableMarketplaceStaffAction = createAction(
	"RECEIVE_DISABLE_MARKETPLACE_STAFF_ACTION"
);
export const requestRemovePendingMarketplaceStaffAction = createAction(
	"REQUEST_REMOVE_PENDING_MARKETPLACE_STAFF_ACTION"
);
export const receiveRemovePendingMarketplaceStaffAction = createAction(
	"RECEIVE_REMOVE_PENDING_MARKETPLACE_STAFF_ACTION"
);
