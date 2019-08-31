import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";

import StaffSettings from "../../../screens/MarketPlaceSettings/StaffSettings";
import {
	requestAddMarketplaceStaffAction,
	requestRemoveMarketplaceStaffAction,
	requestDisableMarketplaceStaffAction,
	requestRemovePendingMarketplaceStaffAction
} from "../../../modules/marketPlaceSettingsAction/actions";
import { Block, Text, Icon } from "../../../components";

class StaffSettingContainer extends PureComponent {
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
			requestAddMarketplaceStaffAction,
			requestRemoveMarketplaceStaffAction,
			requestDisableMarketplaceStaffAction,
			requestRemovePendingMarketplaceStaffAction,
			marketPlacePendingStaffs,
			currentMarketplace,
			marketPlaceAdmins,
			isLoading,
			marketPlaceStaffs,
			request,
			errorMessage,
			error
		} = this.props;
		return (
			<StaffSettings
				requestAddMarketplaceStaffAction={requestAddMarketplaceStaffAction}
				requestRemoveMarketplaceStaffAction={
					requestRemoveMarketplaceStaffAction
				}
				marketPlacePendingStaffs={marketPlacePendingStaffs}
				requestRemovePendingMarketplaceStaffAction={
					requestRemovePendingMarketplaceStaffAction
				}
				requestDisableMarketplaceStaffAction={
					requestDisableMarketplaceStaffAction
				}
				marketPlaceStaffs={marketPlaceStaffs}
				currentMarketplace={currentMarketplace}
				marketPlaceAdmins={marketPlaceAdmins}
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
	requestAddMarketplaceStaffAction,
	requestRemoveMarketplaceStaffAction,
	requestDisableMarketplaceStaffAction,
	requestRemovePendingMarketplaceStaffAction
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
		marketPlaceAdmins: serviceDetailsReducer.marketPlaceAdmins,
		marketPlaceStaffs: serviceDetailsReducer.marketPlaceStaffs,
		currentMarketplace: serviceDetailsReducer.currentMarketplace,
		marketPlacePendingStaffs: marketplaceReducer.marketPlacePendingStaffs,
		error
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StaffSettingContainer);
