import React, { Component } from 'react';
import {
  Image, StyleSheet, Dimensions, TouchableWithoutFeedback,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Block, Text, Input } from '../../components';
import * as theme from '../../constants/theme';
import { authStatus } from '../../modules/auth/reducers';
import { validateInput } from '../../utils/inputFunctions';

const { height } = Dimensions.get('window');

class Register extends Component {
  state = {
    formError: false,
    errorMessage: "",
    fields: {
      firstName: {
        value: "",
        error: true,
        errorMessage: "",
        rules: {
          maxLength: 40,
          minLength: 3
        }
      },
      lastName: {
        value: "",
        error: true,
        errorMessage: "",
        rules: {
          maxLength: 40,
          minLength: 3
        }
      },
      email: {
        value: "",
        error: true,
        errorMessage: "",
        rules: {
          email: true
        }
      },
      password: {
        value: "",
        error: true,
        errorMessage: "",
        rules: {
          maxLength: 100,
          minLength: 8,
          password: true
        }
      },
      confirmPassword: {
        value: "",
        error: true,
        errorMessage: "",
        rules: {
          confirmPassword: true
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
    newState.fields[type] = { ...newState.fields[type], error, errorMessage };

    this.setState((prevState) => ({
      ...prevState,
      ...newState
    }));
  }

  handleSubmit = event => {
    const { firstName, lastName, email, password } = this.state.fields;
    const { requestSignupAction, navigation } = this.props;

    var error = validateInput(this.state.fields);

    if(error){
      return this.setState({
        formError: true,
        errorMessage: "Ensure your inputs are valid"
      })
    };

    requestSignupAction({
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      navigation,
      navigateTo: 'Login'
    });
  }

  render() {
    const { navigation, request, isLoading } = this.props;

		// console.log("datatosubmit register state ", this.state.fields)

    return (
      <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
        <Block center middle style={{ marginBottom: 40, marginTop: 20 }}>
        <Image
            source={require('../../assets/images/Base/Logo.png')}
            style={{ height: 28, width: 102 }}
          />
        </Block>
        <Block flex center>
          <Text h3 style={{ marginBottom: 6 }}>
            Get started for free
          </Text>
          <Text paragraph color="black3">
            Free forever. No credit card needed.
          </Text>
          <Block center style={{ marginTop: 25 }}>
            <Input
              full
              blur={arg => this.blurReact(arg)}
              inputInfo={this.state.fields}
              label="First name"
              type="firstName"
              onChangeText={this.handleChange("firstName")}
              style={{ marginBottom: 25 }}
            />
            <Input
              full
              blur={arg => this.blurReact(arg)}
              inputInfo={this.state.fields}
              type="lastName"
              label="Last name"
              onChangeText={this.handleChange("lastName")}
              style={{ marginBottom: 25 }}
            />
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
            <Input
              full
              blur={arg => this.blurReact(arg)}
              inputInfo={this.state.fields}
              password
              type="password"
              label="Password"
              onChangeText={this.handleChange("password")}
              style={{ marginBottom: 25 }}
            />
            <Input
              full
              inputInfo={this.state.fields}
              password
              blur={arg => this.blurReact(arg)}
              type="confirmPassword"
              label="Confirm password"
              onChangeText={this.handleChange("confirmPassword")}
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
              isLoading={request === authStatus.signup && isLoading}
            >
              <Text button>Create Account</Text>
            </Button>
            <Text paragraph color="gray">
              Already have an account? <Text
                height={18}
                color="blue"
                onPress={() => navigation.navigate('Login')}>
                Sign in
              </Text>
            </Text>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    )
  }
}

export default Register;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    backgroundColor: theme.colors.white,
  },
  active: {
    borderColor: theme.colors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.lightblue,
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  icon: {
    flex: 0,
    height: 48,
    width: 48,
    borderRadius: 48,
    marginBottom: 15,
    backgroundColor: theme.colors.lightblue
  },
  check: {
    position: 'absolute',
    right: -9,
    top: -9,
  }
})