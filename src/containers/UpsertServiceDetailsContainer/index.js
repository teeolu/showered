import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
    requestImageUploadAction,
    requestRemoveImageUploadAction
} from '../../modules/imageUpload/actions';
import {
    requestAddServiceDetailsAction,
    requestEditServiceDetailsAction
} from '../../modules/serviceDetails/actions';
import MarketPlaceServiceDetails from '../../screens/UpsertServiceDetails';

class MarketPlaceServiceDetailsContainer extends PureComponent {
    render() {
        const {
            requestImageUploadAction,
            imageUploadLoading,
            imageUploadUrl,
            imageUploadError,
            deletedPublicId,
            addServiceDetailsLoading,
            addServiceDetailsRequest,
            requestAddServiceDetailsAction,
            requestRemoveImageUploadAction,
            requestEditServiceDetailsAction,
            imageUploadRequest } = this.props;
        return (
            <MarketPlaceServiceDetails
                requestImageUploadAction={requestImageUploadAction}
                requestRemoveImageUploadAction={requestRemoveImageUploadAction}
                imageUploadLoading={imageUploadLoading}
                imageUploadRequest={imageUploadRequest}
                addServiceDetailsRequest={addServiceDetailsRequest}
                addServiceDetailsLoading={addServiceDetailsLoading}
                requestAddServiceDetailsAction={requestAddServiceDetailsAction}
                imageUploadUrl={imageUploadUrl}
                requestEditServiceDetailsAction={requestEditServiceDetailsAction}
                imageUploadError={imageUploadError}
                deletedPublicId={deletedPublicId}
                {...this.props} />
        )
    }
}

const mapStateToProps = ({ imageUploadReducer, serviceDetailsReducer }) => {
    const { imageUrl, error, deletedPublicId } = imageUploadReducer;
    return {
        imageUploadLoading: imageUploadReducer.isLoading,
        imageUploadRequest: imageUploadReducer.request,
        addServiceDetailsLoading: serviceDetailsReducer.isLoading,
        addServiceDetailsRequest: serviceDetailsReducer.request,
        imageUploadUrl: imageUrl,
        deletedPublicId,
        imageUploadError: error || false
    }
}

const mapDispatchToProps = {
    requestImageUploadAction,
    requestRemoveImageUploadAction,
    requestAddServiceDetailsAction,
    requestEditServiceDetailsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlaceServiceDetailsContainer);