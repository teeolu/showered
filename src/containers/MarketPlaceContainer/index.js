import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { requestImageUploadAction } from '../../modules/imageUpload/actions';
import MarketPlace from '../../screens/MarketPlace';

class MarketPlaceContainer extends PureComponent {
    render() {
        const { 
            requestImageUploadAction, 
            imageUploadLoading, 
            imageUploadUrl,
            imageUploadError,
            imageUploadRequest } = this.props;
        return (
            <MarketPlace
                requestImageUploadAction={requestImageUploadAction}
                imageUploadLoading={imageUploadLoading}
                imageUploadRequest={imageUploadRequest}
                imageUploadUrl={imageUploadUrl}
                imageUploadError={imageUploadError}
                {...this.props} />
        )
    }
}

const mapStateToProps = ({ imageUploadReducer }) => {
    const { isLoading, request, imageUrl, error } = imageUploadReducer;
    return {
        imageUploadLoading: isLoading,
        imageUploadRequest: request,
        imageUploadUrl: imageUrl,
        imageUploadError: error || false
    }
}

const mapDispatchToProps = {
    requestImageUploadAction
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlaceContainer);