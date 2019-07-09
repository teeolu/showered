import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { requestLoginAction } from '../../modules/auth/action';
import Browse from '../../screens/Browse';

class BrowseContainer extends PureComponent {
    render() {
        const { requestLoginAction, isLoading, request } = this.props;
        return (
            <Browse
                requestLoginAction={requestLoginAction}
                isLoading={isLoading}
                request={request}
                {...this.props} />
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
    const { isLoading, request } = authReducer;
    return {
        isLoading,
        request
    }
}

const mapDispatchToProps = {
    requestLoginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseContainer);