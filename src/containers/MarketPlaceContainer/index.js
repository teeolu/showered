import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { requestLoginAction } from '../../modules/auth/action';
import MarketPlace from '../../screens/MarketPlace';

class MarketPlaceContainer extends PureComponent {
    render() {
        return (
            <MarketPlace
                {...this.props} />
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {}
}

const mapDispatchToProps = {
    requestLoginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlaceContainer);