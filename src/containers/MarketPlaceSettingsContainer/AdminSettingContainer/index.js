import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";

import AdminSettings from "../../../screens/MarketPlaceSettings/AdminSettings";
import {
	requestAddMarketplaceAdminAction,
	requestRemoveMarketplaceAdminAction,
	requestRemovePendingMarketplaceAdminAction,
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
			requestRemovePendingMarketplaceAdminAction,
			marketPlacePendingAdmins,
			currentMarketplace,
			marketPlaceAdmins,
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
				marketPlacePendingAdmins={marketPlacePendingAdmins}
				currentMarketplace={currentMarketplace}
				requestDisableMarketplaceAdminAction={
					requestDisableMarketplaceAdminAction
				}
				marketPlaceAdmins={marketPlaceAdmins}
				requestRemovePendingMarketplaceAdminAction={
					requestRemovePendingMarketplaceAdminAction
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
	requestDisableMarketplaceAdminAction,
	requestRemovePendingMarketplaceAdminAction
};

const mapStateToProps = ({
	marketPlaceSettingsReducer,
	serviceDetailsReducer,
	marketplaceReducer
}) => {
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
		currentMarketplace: serviceDetailsReducer.currentMarketplace,
		marketPlaceAdmins: serviceDetailsReducer.marketPlaceAdmins,
		marketPlacePendingAdmins: marketplaceReducer.marketPlacePendingAdmins,
		error
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminSettingContainer);
