import React, { PureComponent } from "react";
import { connect } from "react-redux";
import AdminSettings from "../../../screens/MarketPlaceSettings/AdminSettings";
import { requestAddMarketplaceAdminAction } from "../../../modules/marketPlaceSettingsAction/actions";

class AdminSettingContainer extends PureComponent {
	render() {
		const {
			requestAddMarketplaceAdminAction,
			isLoading,
			request,
			error
		} = this.props;
		return (
			<AdminSettings
				requestAddMarketplaceAdminAction={requestAddMarketplaceAdminAction}
				isLoading={isLoading}
				request={request}
				addAdminError={error}
				{...this.props}
			/>
		);
	}
}

const mapDispatchToProps = {
	requestAddMarketplaceAdminAction
};

const mapStateToProps = ({ marketPlaceSettingsReducer }) => {
	const { isLoading, request, error } = marketPlaceSettingsReducer;
	return {
		isLoading,
		request,
		error
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminSettingContainer);
