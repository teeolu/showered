import { createAction } from "redux-actions";

// Fetch all  browse service details and filter by query
export const requestGetAllBrowseServiceDetailsAction = createAction(
	"REQUEST_GET_ALL_BROWSE_SERVICE_DETAILS_ACTION"
);
export const receiveGetAllBrowseServiceDetailsAction = createAction(
	"RECEIVE_GET_ALL_BROWSE_SERVICE_DETAILS_ACTION"
);
export const receiveGetAllBrowseServiceDetailsFilterAction = createAction(
	"RECEIVE_GET_ALL_BROWSE_SERVICE_DETAILS_FILTER_ACTION"
);
