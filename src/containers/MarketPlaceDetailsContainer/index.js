import React, { PureComponent } from "react";
import { connect } from "react-redux";
import MarketPlaceDetails from "../../screens/MarketPlaceDetails";
import {
	requestGetMarketplaceDetailsAction,
	requestGetAdminsMarketplaceAction,
	requestGetStaffsMarketplaceAction
} from "../../modules/MarketplaceDetails/actions";
import {
	requestGetUserMarketplacePendingAdminAction,
	requestGetUserMarketplacePendingStaffAction
} from "../../modules/marketPlace/actions";

class MarketPlaceDetailsContainer extends PureComponent {
	render() {
		const {
			userdata,
			requestGetMarketplaceDetailsAction,
			serviceDetailsLoading,
			serviceDetailsRequest,
			marketplaceServiceDetailsData,
			requestGetAdminsMarketplaceAction,
			currentMarketplace,
			requestGetStaffsMarketplaceAction,
			serviceDetailsError,
			requestGetUserMarketplacePendingAdminAction
		} = this.props;
		return (
			<MarketPlaceDetails
				userdata={userdata}
				serviceDetailsLoading={serviceDetailsLoading}
				requestGetUserMarketplacePendingStaffAction={
					requestGetUserMarketplacePendingStaffAction
				}
				requestGetUserMarketplacePendingAdminAction={
					requestGetUserMarketplacePendingAdminAction
				}
				serviceDetailsRequest={serviceDetailsRequest}
				requestGetStaffsMarketplaceAction={requestGetStaffsMarketplaceAction}
				requestGetAdminsMarketplaceAction={requestGetAdminsMarketplaceAction}
				marketplaceServiceDetailsData={marketplaceServiceDetailsData}
				serviceDetailsError={serviceDetailsError}
				currentMarketplace={currentMarketplace}
				requestGetMarketplaceDetailsAction={requestGetMarketplaceDetailsAction}
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = ({ authReducer, serviceDetailsReducer }) => {
	return {
		userdata: authReducer.userdata,
		serviceDetailsLoading: serviceDetailsReducer.isLoading,
		serviceDetailsRequest: serviceDetailsReducer.request,
		marketplaceServiceDetailsData:
			serviceDetailsReducer.marketplaceServiceDetailsData,
		serviceDetailsError: serviceDetailsReducer.error,
		marketPlaceAdmins: serviceDetailsReducer.marketPlaceAdmins,
		currentMarketplace: serviceDetailsReducer.currentMarketplace
	};
};

const mapDispatchToProps = {
	requestGetMarketplaceDetailsAction,
	requestGetAdminsMarketplaceAction,
	requestGetStaffsMarketplaceAction,
	requestGetUserMarketplacePendingAdminAction,
	requestGetUserMarketplacePendingStaffAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MarketPlaceDetailsContainer);
