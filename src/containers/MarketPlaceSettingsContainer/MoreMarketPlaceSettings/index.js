import React, { PureComponent } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "react-native-vector-icons";

import { Block, Text, Icon } from "../../../components";
import { theme } from "../../../constants";
import MoreMarketPlaceSetting from "../../../screens/MarketPlaceSettings/MoreSettings";
import { requestDisableMarketplaceAction } from "../../../modules/marketPlace/actions";

class MoreMarketPlaceSettingsContainer extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeftContainerStyle: {
			paddingLeft: 24
		},
		headerRightContainerStyle: {
			paddingRight: 24
		},
		headerLeft: (
			<TouchableOpacity onPress={() => navigation.pop()}>
				<Ionicons
					name="ios-arrow-round-back"
					color={theme.colors.gray}
					size={theme.sizes.font * 3}
				/>
			</TouchableOpacity>
		),
		headerRight: (
			<TouchableOpacity>
				<Icon notification />
			</TouchableOpacity>
		),
		headerTitle: (
			<Block row middle>
				<Text h4>Marketplace settings</Text>
			</Block>
		)
	});

	render() {
		const {
			isLoading,
			request,
			error,
			errorMessage,
			userdata,
			serviceDetailsLoading,
			serviceDetailsRequest,
			currentMarketplace,
			marketPlaceAdmins,
			requestDisableMarketplaceAction,
			requestGetStaffsMarketplaceAction,
			serviceDetailsError
		} = this.props;
		return (
			<MoreMarketPlaceSetting
				{...this.props}
				isLoading={isLoading}
				request={request}
				error={error}
				errorMessage={errorMessage}
				currentMarketplace={currentMarketplace}
				userdata={userdata}
				requestDisableMarketplaceAction={requestDisableMarketplaceAction}
				marketPlaceAdmins={marketPlaceAdmins}
				serviceDetailsLoading={serviceDetailsLoading}
				serviceDetailsRequest={serviceDetailsRequest}
				requestGetStaffsMarketplaceAction={requestGetStaffsMarketplaceAction}
				serviceDetailsError={serviceDetailsError}
			/>
		);
	}
}

const mapStateToProps = ({
	authReducer,
	marketplaceReducer,
	serviceDetailsReducer
}) => {
	const { isLoading, request, error, errorMessage } = marketplaceReducer;
	return {
		isLoading,
		request,
		error,
		errorMessage,
		userdata: authReducer.userdata,
		serviceDetailsLoading: serviceDetailsReducer.isLoading,
		serviceDetailsRequest: serviceDetailsReducer.request,
		serviceDetailsError: serviceDetailsReducer.error,
		marketPlaceAdmins: serviceDetailsReducer.marketPlaceAdmins,
		currentMarketplace: serviceDetailsReducer.currentMarketplace
	};
};

const mapDispatchToProps = {
	requestDisableMarketplaceAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MoreMarketPlaceSettingsContainer);
