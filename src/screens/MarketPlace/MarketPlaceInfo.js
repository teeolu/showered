import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Text, Input, Card } from '../../components';

class AddMarketplaceInfo extends Component {
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
        return (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Card
                    title="BASIC INFORMATION"
                    style={{
                        flex: 1,
                    }}
                >
                    <Input
                        full
                        blur={arg => this.blurReact(arg)}
                        inputInfo={this.state.fields}
                        label="Market place name"
                        type="marketPlaceName"
                        onChangeText={this.handleChange("marketPlaceName")}
                        style={{ marginBottom: 25 }}
                    />
                    <Input
                        full
                        blur={arg => this.blurReact(arg)}
                        inputInfo={this.state.fields}
                        type="description"
                        label="Description"
                        multiline={true}
                        onChangeText={this.handleChange("description")}
                        style={{ marginBottom: 25, height:200, textAlignVertical: 'top' }}
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

export default AddMarketplaceInfo;