import React, { Component } from 'react'
import { StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as theme from '../constants/theme';

const { width } = Dimensions.get('window');

export default class Button extends Component {
  render() {
    const { style, full, opacity, isLoading, children, ...props } = this.props;
    const buttonStyles = [
      styles.button,
      full && styles.full,
      style,
    ];

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}
      >
        {children}
        {isLoading && (
          <ActivityIndicator 
            style={{ marginLeft: 5 }}
            size='small'
            color='#fff'/>
        )}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.blue,
    borderRadius: 4,
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  full: {
    width: width - 50,
  }
});
