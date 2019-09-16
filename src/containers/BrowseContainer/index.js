import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Browse from "../../screens/Browse";
import { requestGetAllBrowseServiceDetailsAction } from "../../modules/browse/actions";

class BrowseContainer extends PureComponent {
	render() {
		const {
			requestLoginAction,
			requestGetAllBrowseServiceDetailsAction,
			isLoading,
			request,
			allServiceDetailsData,
			allServiceDetailsFilterData
		} = this.props;

		return (
			<Browse
				requestLoginAction={requestLoginAction}
				allServiceDetailsFilterData={allServiceDetailsFilterData}
				requestGetAllBrowseServiceDetailsAction={
					requestGetAllBrowseServiceDetailsAction
				}
				allServiceDetailsData={allServiceDetailsData}
				isLoading={isLoading}
				request={request}
				{...this.props}
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
	requestGetAllBrowseServiceDetailsAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrowseContainer);
