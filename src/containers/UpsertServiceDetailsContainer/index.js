import React, { PureComponent } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "react-native-vector-icons";

import { Block, Text, Icon } from "../../components";
import { theme } from "../../constants";

import {
	requestImageUploadAction,
	requestRemoveImageUploadAction
} from "../../modules/imageUpload/actions";
import {
	requestAddMarketplaceServiceDetailsAction,
	requestEditMarketplaceServiceDetailsAction
} from "../../modules/MarketplaceServiceDetails/actions";
import MarketPlaceServiceDetails from "../../screens/UpsertServiceDetails";

class MarketPlaceServiceDetailsContainer extends PureComponent {
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
			requestImageUploadAction,
			imageUploadLoading,
			imageUploadUrl,
			imageUploadError,
			deletedPublicId,
			addServiceDetailsLoading,
			currentMarketplace,
			addServiceDetailsRequest,
			requestAddMarketplaceServiceDetailsAction,
			requestRemoveImageUploadAction,
			requestEditMarketplaceServiceDetailsAction,
			imageUploadRequest
		} = this.props;
		return (
			<MarketPlaceServiceDetails
				requestImageUploadAction={requestImageUploadAction}
				requestRemoveImageUploadAction={requestRemoveImageUploadAction}
				imageUploadLoading={imageUploadLoading}
				imageUploadRequest={imageUploadRequest}
				currentMarketplace={currentMarketplace}
				addServiceDetailsRequest={addServiceDetailsRequest}
				addServiceDetailsLoading={addServiceDetailsLoading}
				requestAddMarketplaceServiceDetailsAction={
					requestAddMarketplaceServiceDetailsAction
				}
				imageUploadUrl={imageUploadUrl}
				requestEditMarketplaceServiceDetailsAction={
					requestEditMarketplaceServiceDetailsAction
				}
				imageUploadError={imageUploadError}
				deletedPublicId={deletedPublicId}
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = ({ imageUploadReducer, serviceDetailsReducer }) => {
	const { imageUrl, error, deletedPublicId } = imageUploadReducer;
	return {
		imageUploadLoading: imageUploadReducer.isLoading,
		imageUploadRequest: imageUploadReducer.request,
		addServiceDetailsLoading: serviceDetailsReducer.isLoading,
		addServiceDetailsRequest: serviceDetailsReducer.request,
		currentMarketplace: serviceDetailsReducer.currentMarketplace,
		imageUploadUrl: imageUrl,
		deletedPublicId,
		imageUploadError: error || false
	};
};

const mapDispatchToProps = {
	requestImageUploadAction,
	requestRemoveImageUploadAction,
	requestAddMarketplaceServiceDetailsAction,
	requestEditMarketplaceServiceDetailsAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MarketPlaceServiceDetailsContainer);
