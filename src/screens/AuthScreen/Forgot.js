import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, Dimensions } from 'react-native';

import { Button, Block, Text, Input } from '../../components';

const { height } = Dimensions.get('window');

class Forgot extends Component {
  state = {
    formError: false,
    errorMessage: "",
    fields: {
      email: {
        value: "",
        error: false,
        errorMessage: "",
        rules: {
          email: true
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
      valid = valid && el.error;
    });
    return valid;
  }

  handleSubmit = event => {
    // () => navigation.navigate('Overview')
    //First, verify that no error in any of the input field
    var valid = this.validateInput(this.state.fields);
    if (!valid) {
      return this.setState({
        formError: true,
        errorMessage: "Ensure your inputs are valid"
      })
    }

    this.props.navigation.navigate('Overview')
  }

  render() {
    const { navigation } = this.props;

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
              Let's Reset Your Password
            </Text>
            <Text paragraph color="black3">
              A recovery mail will be sent to your email
            </Text>
            <Block center style={{ marginTop: 44 }}>
              <Input
                full
                blur={arg => this.blurReact(arg)}
                inputInfo={this.state.fields}
                email
                type="email"
                label="Email address"
                onChangeText={this.handleChange("email")}
                style={{ marginBottom: 25 }}
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
              >
                <Text button>Reset password</Text>
              </Button>
              <Text paragraph color="gray">
                Don't have an account?
                <Text
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

export default Forgot;