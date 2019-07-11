import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Text, Input, Card } from '../../components';

class MarketPlaceContactInfo extends Component {
    state = {
        formError: false,
        errorMessage: "",
        fields: {
            firstName: {
                value: "",
                error: false,
                errorMessage: "",
                rules: {
                    maxLength: 40,
                    minLength: 3
                }
            },
            lastName: {
                value: "",
                error: false,
                errorMessage: "",
                rules: {
                    maxLength: 40,
                    minLength: 3
                }
            },
            email: {
                value: "",
                error: false,
                errorMessage: "",
                rules: {
                    email: true
                }
            },
            password: {
                value: "",
                error: false,
                errorMessage: "",
                rules: {
                    maxLength: 100,
                    minLength: 8,
                    password: true
                }
            },
            confirmPassword: {
                value: "",
                error: false,
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

    validateInput = arg => {
        let valid = true;
        Object.keys(arg).map(el => {
            valid = valid && arg[el].error;
        });
        return valid;
    }

    handleSubmit = event => {
        const { firstName, lastName, email, password } = this.state.fields;
        const { requestSignupAction, navigation } = this.props;

        var inValid = this.validateInput(this.state.fields);
        if (inValid) {
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

        return (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Card
                    title="MARKET PLACE CONTACT INFO"
                    style={{
                        flex: 1,
                    }}
                >
                    <Input
                        full
                        blur={arg => this.blurReact(arg)}
                        inputInfo={this.state.fields}
                        email
                        type="email"
                        label="Market place email address"
                        onChangeText={this.handleChange("email")}
                        style={{ marginBottom: 25 }}
                    />
                    <Input
                        full
                        blur={arg => this.blurReact(arg)}
                        inputInfo={this.state.fields}
                        type="number"
                        label="Market place phone number"
                        onChangeText={this.handleChange("password")}
                        style={{ marginBottom: 25 }}
                    />
                    <Input
                        full
                        inputInfo={this.state.fields}
                        blur={arg => this.blurReact(arg)}
                        type="confirmPassword"
                        label="Market place address"
                        onChangeText={this.handleChange("confirmPassword")}
                        style={{ marginBottom: 25 }}
                    />

                    {this.state.formError && (
                        <Text paragraph color="gray">
                            {this.state.errorMessage}
                        </Text>
                    )}
                </Card>
            </KeyboardAwareScrollView>
        )
    }
}

export default MarketPlaceContactInfo;