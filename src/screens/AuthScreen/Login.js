import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, Dimensions } from 'react-native';

import { Button, Block, Text, Input } from '../../components';
import { authStatus } from '../../modules/auth/reducers';

const { height } = Dimensions.get('window');

class Login extends Component {
  state = {
    formError: false,
    errorMessage: "",
    fields: {
      email: {
        value: "lol@gmail.com",
        error: false,
        errorMessage: "",
        rules: {
          email: true
        }
      },
      password: {
        value: "Mymy1998",
        error: false,
        errorMessage: "",
        rules: {
          maxLength: 100,
          minLength: 8,
          password: true
        }
      }
    }
  }

  handleChange = type => text => {
    let newState = { ...this.state };
    newState.fields[type] = { ...newState.fields[type], value: text, error: false, errorMessage: "" }

    this.setState((prevState) => ({
      ...prevState,
      ...newState,
      formError: false,
      errorMessage: ""
    }));
  }

  blurReact = ({ error, errorMessage, type }) => {
    let newState = { ...this.state };
    newState.fields[type] = { ...newState.fields[type], error, errorMessage }

    this.setState((prevState) => ({
      ...prevState,
      ...newState
    }));
  }

  validateInput = arg => {
    let valid = true;
    Object.keys(arg).map(el => {
      valid = valid && arg[el].error;
    });
    return valid;
  }

  handleSubmit = event => {
    const { requestLoginAction, navigation } = this.props;
    var inValid = this.validateInput(this.state.fields);
    if (inValid) {
      return this.setState({
        formError: true,
        errorMessage: "Ensure your inputs are valid"
      })
    }

    requestLoginAction({
      email: this.state.fields.email.value.toLowerCase(),
      password: this.state.fields.password.value,
      navigation,
      navigateTo: 'Overview'
    });
  }

  render() {
    const { navigation, isLoading, request } = this.props;

    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={height * 0.2}
      >
        <Block center middle>
          <Block middle>
          <Image
source={require('../../assets/images/Base/Logo.png')}
style={{ height: 28, width: 102 }}
/>
          </Block>
          <Block flex={2.5} center>
            <Text h3 style={{ marginBottom: 6 }}>
              Sign in to Marketplace
            </Text>
            <Text paragraph color="black3">
              Please enter your credentials to proceed.
            </Text>
            <Block center style={{ marginTop: 44 }}>
              <Input
                full
                blur={arg => this.blurReact(arg)}
                inputInfo={this.state.fields}
                email
                type="email"
                value={this.state.fields.email.value}
                label="Email address"
                onChangeText={this.handleChange("email")}
                style={{ marginBottom: 25 }}
              />
              <Input
                full
                blur={arg => this.blurReact(arg)}
                inputInfo={this.state.fields}
                value={this.state.fields.password.value}
                password
                type="password"
                label="Password"
                onChangeText={this.handleChange("password")}
                style={{ marginBottom: 25 }}
                rightLabel={
                  <Text
                    paragraph
                    color="gray"
                    onPress={() => navigation.navigate('Forgot')}
                  >
                    Forgot password?
                  </Text>
                }
              />

              {this.state.formError && (
                <Text paragraph color="gray">
                  {this.state.errorMessage}
                </Text>
              )}

              <Button
                full
                style={{ marginBottom: 12 }}
                onPress={this.handleSubmit}
                isLoading={request === authStatus.login && isLoading}
              >
                <Text button>Sign in</Text>
              </Button>
              <Text paragraph color="gray">
                Don't have an account? <Text
                  height={18}
                  color="blue"
                  onPress={() => navigation.navigate('Register')}>
                  Sign up
                </Text>
              </Text>
            </Block>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

export default Login;