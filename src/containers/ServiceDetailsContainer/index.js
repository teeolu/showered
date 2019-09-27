import React, { Component } from "react";
import { connect } from "react-redux";
import ServiceDetails from "../../screens/ServiceDetails";
import { requestSetCurrentServiceDetails } from "../../modules/MarketplaceServiceDetails/actions";

class ServiceDetailsContainer extends Component {
	render() {
		const {
			userdata,
			currentServiceDetails,
			requestSetCurrentServiceDetails
		} = this.props;
		return (
			<ServiceDetails
				{...this.props}
				userdata={userdata}
				currentServiceDetails={currentServiceDetails}
				requestSetCurrentServiceDetails={requestSetCurrentServiceDetails}
			/>
		);
	}
}

const mapStateToProps = ({ authReducer, serviceDetailsReducer }) => {
	return {
		userdata: authReducer.userdata,
		currentServiceDetails: serviceDetailsReducer.currentServiceDetails
	};
};

const mapDispatchToProps = {
	requestSetCurrentServiceDetails
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ServiceDetailsContainer);
