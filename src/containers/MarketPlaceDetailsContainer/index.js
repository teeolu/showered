import React, { PureComponent } from "react";
import { connect } from "react-redux";
import MarketPlaceDetails from "../../screens/MarketPlaceDetails";
import {
	requestGetMarketplaceDetailsAction,
	requestGetAdminsMarketplaceAction
} from "../../modules/MarketplaceDetails/actions";

class MarketPlaceDetailsContainer extends PureComponent {
	render() {
		const {
			userdata,
			requestGetMarketplaceDetailsAction,
			serviceDetailsLoading,
			serviceDetailsRequest,
			marketplaceServiceDetailsData,
			requestGetAdminsMarketplaceAction,
			serviceDetailsError
		} = this.props;
		return (
			<MarketPlaceDetails
				userdata={userdata}
				serviceDetailsLoading={serviceDetailsLoading}
				serviceDetailsRequest={serviceDetailsRequest}
				requestGetAdminsMarketplaceAction={requestGetAdminsMarketplaceAction}
				marketplaceServiceDetailsData={marketplaceServiceDetailsData}
				serviceDetailsError={serviceDetailsError}
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
		marketPlaceAdmins: serviceDetailsReducer.marketPlaceAdmins
	};
};

const mapDispatchToProps = {
	requestGetMarketplaceDetailsAction,
	requestGetAdminsMarketplaceAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MarketPlaceDetailsContainer);
