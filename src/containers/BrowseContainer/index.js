import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";

import { Block, Text, Icon } from "../../components";
import Browse from "../../screens/Browse";
import { requestGetAllBrowseServiceDetailsAction } from "../../modules/browse/actions";
import { requestSetCurrentServiceDetails } from "../../modules/MarketplaceServiceDetails/actions";

class BrowseContainer extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		header: null
	});

	render() {
		const {
			requestLoginAction,
			requestGetAllBrowseServiceDetailsAction,
			isLoading,
			request,
			allServiceDetailsData,
			allServiceDetailsFilterData,
			requestSetCurrentServiceDetails
		} = this.props;
		return (
			<Browse
				{...this.props}
				requestLoginAction={requestLoginAction}
				requestSetCurrentServiceDetails={requestSetCurrentServiceDetails}
				allServiceDetailsFilterData={allServiceDetailsFilterData}
				requestGetAllBrowseServiceDetailsAction={
					requestGetAllBrowseServiceDetailsAction
				}
				allServiceDetailsData={allServiceDetailsData}
				isLoading={isLoading}
				request={request}
			/>
		);
	}
}

const mapStateToProps = ({ browseReducer }) => {
	const {
		isLoading,
		request,
		error,
		errorMessage,
		allServiceDetailsData,
		allServiceDetailsFilterData
	} = browseReducer;
	return {
		isLoading,
		request,
		error,
		errorMessage,
		allServiceDetailsData,
		allServiceDetailsFilterData
	};
};

const mapDispatchToProps = {
	requestGetAllBrowseServiceDetailsAction,
	requestSetCurrentServiceDetails
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrowseContainer);
