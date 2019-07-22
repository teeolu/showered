import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

import Text from './Text';
import { theme } from '../constants';
const { width } = Dimensions.get('window');


export default class Box extends Component {
    render() {
        const { name, onPress } = this.props;

        return (
            <View
                style={{
                    borderRadius: theme.sizes.radius,
                    backgroundColor: theme.colors.white,
                    shadowColor: theme.colors.shadow,
                    shadowOpacity: 1,
                    shadowRadius: 10,
                    shadowOffset: { width: 0, height: 0 },
                    elevation: 2,
                    marginBottom: theme.sizes.base,
                    minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
                    maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
                    maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
                }}
            >
                <TouchableOpacity
                    onPress={() => onPress(name)}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            borderRadius: theme.sizes.border,
                            borderRadius: theme.sizes.border,
                        }}>
                        <AntDesign
                            name='shoppingcart'
                            color={theme.colors.shadow}
                            size={theme.sizes.font * 3} />
                        <Text paragraph onPress={this.navigateToBrowse} style={{ marginTop: 17 }}>{name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}