import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginContainer from '../containers/AuthContainer/LoginContainer';
import RegisterContainer from '../containers/AuthContainer/RegisterContainer';
import ForgotPasswordContainer from '../containers/AuthContainer/ForgotPasswordContainer';

export default createStackNavigator({
  Login: LoginContainer,
  Register: RegisterContainer,
  Forgot: ForgotPasswordContainer,
}, {
  defaultNavigationOptions: {
    header: null
  }
});
