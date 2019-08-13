import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { requestGetUserMarketplaceAction } from '../../modules/marketPlace/actions'
import UserProfile from '../../screens/UserProfile';

class UserProfileContainer extends PureComponent {
    render() {
        const { 
            userdata,
            marketPlaceLoading,
            marketPlaceRequest,
            userMarketplaceData,
            requestGetUserMarketplaceAction } = this.props;
        return (
            <UserProfile
                userdata={userdata}
                marketPlaceRequest={marketPlaceRequest}
                marketPlaceLoading={marketPlaceLoading}
                userMarketplaceData={userMarketplaceData}
                requestGetUserMarketplaceAction={requestGetUserMarketplaceAction}
                {...this.props} />
        )
    }
}

const mapStateToProps = ({ authReducer, marketplaceReducer }) => {
    return {
        userdata: authReducer.userdata,
        marketPlaceLoading: marketplaceReducer.isLoading,
        marketPlaceRequest: marketplaceReducer.getMarketPlace,
        userMarketplaceData: marketplaceReducer.userMarketplaceData
    }
}

const mapDispatchToProps = {
    requestGetUserMarketplaceAction
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);