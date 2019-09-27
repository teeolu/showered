import React, { PureComponent } from "react";
import { connect } from "react-redux";

import {
	requestImageUploadAction,
	requestRemoveImageUploadAction
} from "../../modules/imageUpload/actions";
import {
	requestAddMarketplaceAction,
	requestEditMarketplaceAction
} from "../../modules/marketPlace/actions";
import MarketPlace from "../../screens/UpsertMarketPlace";

class UpsertMarketPlaceContainer extends PureComponent {
	render() {
		const {
			requestImageUploadAction,
			imageUploadLoading,
			imageUploadUrl,
			imageUploadError,
			deletedPublicId,
			requestAddMarketplaceAction,
			requestRemoveImageUploadAction,
			requestEditMarketplaceAction,
			imageUploadRequest
		} = this.props;
		return (
			<MarketPlace
				requestImageUploadAction={requestImageUploadAction}
				requestRemoveImageUploadAction={requestRemoveImageUploadAction}
				imageUploadLoading={imageUploadLoading}
				imageUploadRequest={imageUploadRequest}
				requestAddMarketplaceAction={requestAddMarketplaceAction}
				imageUploadUrl={imageUploadUrl}
				requestEditMarketplaceAction={requestEditMarketplaceAction}
				imageUploadError={imageUploadError}
				deletedPublicId={deletedPublicId}
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = ({ imageUploadReducer, marketplaceReducer }) => {
	const { imageUrl, error, deletedPublicId } = imageUploadReducer;
	return {
		imageUploadLoading: imageUploadReducer.isLoading,
		imageUploadRequest: imageUploadReducer.request,
		addMarketplaceLoading: marketplaceReducer.isLoading,
		addMarketplaceRequest: marketplaceReducer.request,
		imageUploadUrl: imageUrl,
		deletedPublicId,
		imageUploadError: error || false
	};
};

const mapDispatchToProps = {
	requestImageUploadAction,
	requestRemoveImageUploadAction,
	requestAddMarketplaceAction,
	requestEditMarketplaceAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpsertMarketPlaceContainer);
