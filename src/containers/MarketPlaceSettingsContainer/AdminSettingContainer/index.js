import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";

import AdminSettings from "../../../screens/MarketPlaceSettings/AdminSettings";
import {
	requestAddMarketplaceAdminAction,
	requestRemoveMarketplaceAdminAction,
	requestDisableMarketplaceAdminAction
} from "../../../modules/marketPlaceSettingsAction/actions";
import { Block, Text, Icon } from "../../../components";

class AdminSettingContainer extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeftContainerStyle: {
			paddingLeft: 24
		},
		headerRightContainerStyle: {
			paddingRight: 24
		},
		headerLeft: (
			<TouchableOpacity onPress={navigation.openDrawer}>
				<Icon menu />
			</TouchableOpacity>
		),
		headerRight: (
			<TouchableOpacity>
				<Icon notification />
			</TouchableOpacity>
		),
		headerTitle: (
			<Block row middle>
				<Text h4>Your profile</Text>
			</Block>
		)
	});

	render() {
		const {
			requestAddMarketplaceAdminAction,
			requestRemoveMarketplaceAdminAction,
			requestDisableMarketplaceAdminAction,
			isLoading,
			request,
			errorMessage,
			error
		} = this.props;
		return (
			<AdminSettings
				requestAddMarketplaceAdminAction={requestAddMarketplaceAdminAction}
				requestRemoveMarketplaceAdminAction={
					requestRemoveMarketplaceAdminAction
				}
				requestDisableMarketplaceAdminAction={
					requestDisableMarketplaceAdminAction
				}
				isLoading={isLoading}
				request={request}
				requestError={errorMessage}
				isError={error}
				{...this.props}
			/>
		);
	}
}

const mapDispatchToProps = {
	requestAddMarketplaceAdminAction,
	requestRemoveMarketplaceAdminAction,
	requestDisableMarketplaceAdminAction
};

const mapStateToProps = ({ marketPlaceSettingsReducer }) => {
	const {
		isLoading,
		request,
		error,
		errorMessage
	} = marketPlaceSettingsReducer;
	return {
		isLoading,
		request,
		errorMessage,
		error
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminSettingContainer);
