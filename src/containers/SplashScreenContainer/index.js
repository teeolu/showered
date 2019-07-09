import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { requestUserinfoAction } from '../../modules/auth/action';
import SplashScreen from '../../screens/SplashScreen';

class SplashScreenContainer extends PureComponent {
    render() {
        const { requestUserinfoAction } = this.props;
        return (
            <SplashScreen
                requestUserinfoAction={requestUserinfoAction}
                {...this.props} />
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
    }
}

const mapDispatchToProps = {
    requestUserinfoAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreenContainer);