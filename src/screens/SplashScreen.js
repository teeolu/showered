import React, { Component } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';

import { Block } from '../components';
import { getToken } from '../Auth';

class SplashScreen extends Component {
  async componentDidMount(){
    const { navigation, requestUserinfoAction } = this.props
    const token = await getToken();

    token && token.length > 20 
      ? requestUserinfoAction({ navigation, navigateTo: 'Overview', token })
      : navigation.navigate('Login')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Block center middle>
        <Block middle>
            <ActivityIndicator size='large' color='blue' />
            <Image
              source={require('../assets/images/Base/Logo.png')}
              style={{ height: 28, width: 102 }}
            />
          </Block>
        </Block>
      </View>
    )
  }
}

export default SplashScreen;