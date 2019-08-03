import React, { PureComponent } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Text, Input, Card } from '../../components';

class AddMarketplaceInfo extends PureComponent {
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

    blurReact = ({ error, errorMessage, type }) => {
        let newState = { ...this.state };
        newState.fields[type] = { ...newState.fields[type], error, errorMessage };

        this.setState((prevState) => ({
            ...prevState,
            ...newState
        }));
    }

    handleText = text => () => {
        this.props.handleChange("marketPlaceName", text)
    }

    render() {
        const { handleChange, blur, inputInfo } = this.props;
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
                        blur={blur}
                        inputInfo={inputInfo}
                        label="Market place name"
                        type="marketPlaceName"
                        onChangeText={handleChange('marketPlaceName')}
                        style={{ marginBottom: 25 }}
                    />
                    <Input
                        full
                        blur={blur}
                        inputInfo={inputInfo}
                        type="description"
                        label="Description"
                        multiline={true}
                        onChangeText={handleChange("description")}
                        style={{ marginBottom: 25, height:200, textAlignVertical: 'top' }}
                    />
                </Card>
            </KeyboardAwareScrollView>
        )
    }
}

export default AddMarketplaceInfo;