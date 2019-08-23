import React, { PureComponent } from "react";
import { connect } from "react-redux";
import MarketPlaceDetails from "../../screens/MarketPlaceDetails";
import { requestGetServiceDetailsAction } from "../../modules/serviceDetails/actions";

class MarketPlaceDetailsContainer extends PureComponent {
	render() {
		const {
			userdata,
			requestGetServiceDetailsAction,
			serviceDetailsLoading,
			serviceDetailsRequest,
			marketplaceServiceDetailsData,
			serviceDetailsError
		} = this.props;
		return (
			<MarketPlaceDetails
				userdata={userdata}
				serviceDetailsLoading={serviceDetailsLoading}
				serviceDetailsRequest={serviceDetailsRequest}
				marketplaceServiceDetailsData={marketplaceServiceDetailsData}
				serviceDetailsError={serviceDetailsError}
				requestGetServiceDetailsAction={requestGetServiceDetailsAction}
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
		serviceDetailsError: serviceDetailsReducer.error
	};
};

const mapDispatchToProps = {
	requestGetServiceDetailsAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MarketPlaceDetailsContainer);
