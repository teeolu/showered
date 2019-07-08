import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Login from '../../screens/AuthScreen/Login';
import { requestLoginAction } from '../../modules/auth/action';

class LoginContainer extends PureComponent {
    render() {
        const { requestLoginAction, isLoading, request } = this.props;
        return (
            <Login
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);