import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Register from '../../screens/AuthScreen/Register';
import { requestSignupAction } from '../../modules/auth/action';

class RegisterContainer extends PureComponent {
    render(){
        const { requestSignupAction, isLoading, request } = this.props;
        return (
            <Register 
                requestSignupAction={requestSignupAction}
                isLoading={isLoading}
                request={request}
                {...this.props}
            />
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
    requestSignupAction
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);