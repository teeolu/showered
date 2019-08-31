import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";

import { requestGetUserMarketplaceAction } from "../../modules/marketPlace/actions";
import UserProfile from "../../screens/UserProfile";
import { Block, Text, Icon } from "../../components";
import { requestSetCurrentMarketplace } from "../../modules/MarketplaceDetails/actions";

class UserProfileContainer extends PureComponent {
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
			userdata,
			marketPlaceLoading,
			marketPlaceRequest,
			userMarketplaceData,
			requestGetUserMarketplaceAction,
			requestSetCurrentMarketplace
		} = this.props;
		return (
			<UserProfile
				userdata={userdata}
				marketPlaceRequest={marketPlaceRequest}
				marketPlaceLoading={marketPlaceLoading}
				userMarketplaceData={userMarketplaceData}
				requestSetCurrentMarketplace={requestSetCurrentMarketplace}
				requestGetUserMarketplaceAction={requestGetUserMarketplaceAction}
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = ({ authReducer, marketplaceReducer }) => {
	return {
		userdata: authReducer.userdata,
		marketPlaceLoading: marketplaceReducer.isLoading,
		marketPlaceRequest: marketplaceReducer.getMarketPlace,
		userMarketplaceData: marketplaceReducer.userMarketplaceData
	};
};

const mapDispatchToProps = {
	requestGetUserMarketplaceAction,
	requestSetCurrentMarketplace
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserProfileContainer);
