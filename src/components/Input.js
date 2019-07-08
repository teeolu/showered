import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Dimensions } from 'react-native'
import Text from './Text';
import * as theme from '../constants/theme';

const { width } = Dimensions.get("window");

export default class Input extends Component {
  handleBlur = type => event => {
    var properties = {...this.props.inputInfo};
    var { rules, value } = properties[this.props.type];

    const setError = (error) => {
      this.props.blur({...error, type })
    }

    if(value.length === 0 ){
      return setError({ error: true, errorMessage: 'Field can\'t be empty' })
    }
    if(rules.maxLength && value.length > rules.maxLength){
      return setError({ error: true, errorMessage: 'value too long' })
    }
    if(rules.minLength && value.length < rules.minLength){
      return setError({ error: true, errorMessage: 'value too short' })
    }
    if(rules.email){
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var valid = re.test(value);
      if(!valid){
        return setError({ error: true, errorMessage: 'Email must be a valid mail' });
      }
    }
    if(rules.password){
      var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
      var valid = re.test(value);
      if(!valid){
        return setError({ error: true, errorMessage: 'Atleast a number, a capital letter, and minimum of 8 characters' })
      }
    }
    if(rules.confirmPassword){
      if(value !== properties["password"].value){
        return setError({ error: true, errorMessage: 'Must be equal to password input' })
      }
    }

  }

  render() {
    const { label, rightLabel, type, autoFocus, inputInfo = {}, full, email, phone, number, password, style, ...props } = this.props;
    const inputStyles = [
      styles.input,
      full && styles.full,
      style,
    ];

    const inputType = email
      ? 'email-address' : number
        ? 'numeric' : phone
          ? 'phone-pad' : 'default';

    return (
      <View>
        <View style={styles.labelContainer}>
          <Text caption medium style={styles.label}>
            {label}
          </Text>
          {rightLabel}
        </View>
        {inputInfo && inputInfo[type] && inputInfo[type].error && (
          <Text paragraph color="black3">
            {inputInfo[type].errorMessage}
          </Text>
        )}
        <TextInput
          style={inputStyles}
          secureTextEntry={password}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={autoFocus && true}
          onBlur={this.handleBlur(type)}
          keyboardType={inputType}
          {...props}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.input,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    borderRadius: 5,
    fontSize: theme.sizes.font,
    color: theme.colors.black,
    height: 45,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  label: {
    textTransform: 'uppercase',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  full: {
    width: width - 50,
  }
});
