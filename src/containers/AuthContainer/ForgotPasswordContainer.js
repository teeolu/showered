import React, { PureComponent } from 'react';
import Forgot from '../../screens/AuthScreen/Forgot';

class ForgotPasswordContainer extends PureComponent {
    render(){
        return (
            <Forgot {...this.props}/>
        )
    }
}

export default ForgotPasswordContainer;