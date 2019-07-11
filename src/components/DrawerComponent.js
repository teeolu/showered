import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

import { theme } from '../constants';
import { Button } from '.';

const routes = [
    { navigateTo: "OverviewStack", screen: "Home" },
    { navigateTo: "Browse", screen: "Browse places" },
    { navigateTo: "Settings", screen: "Settings" }
]

export default class DrawerComponent extends Component {

    navigateToScreen = (route) => (
        () => {
            const navigateAction = NavigationActions.navigate({
                routeName: route
            });
            this.props.navigation.dispatch(navigateAction);
        })

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <ImageBackground 
                        source={{ 
                            uri: 'https://source.unsplash.com/1600x900/?joy,love,happiness' }} 
                        style={{ 
                            flex: 1, width: 280, justifyContent: 'center' }} >
                    </ImageBackground>
                </View>
                <View style={styles.screenContainer}>
                    {routes.map(route => (
                        <View
                            key={route.navigateTo}
                            style={[styles.screenStyle, (this.props.activeItemKey == route.navigateTo) ? styles.activeBackgroundColor : null]}>
                            <Text
                                style={[styles.screenTextStyle, (this.props.activeItemKey == route.navigateTo) ? styles.selectedTextStyle : null]}
                                onPress={this.navigateToScreen(route.navigateTo)}>
                                {route.screen}
                            </Text>
                        </View>
                    ))}
                    <Button
                        full
                        style={{ marginBottom: 12, width: '100%' }}
                        onPress={this.navigateToScreen("MarketPlaceContainer")}
                        isLoading={false}
                    >
                        <Text style={{ color: 'white' }} button>Add a market place</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 200,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: {
        padding: theme.sizes.base,
        backgroundColor: theme.colors.white,
        width: '100%',
    },
    screenStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.sizes.base,
        width: '100%'
    },
    screenTextStyle: {
        fontSize: 20,
        textAlign: 'center'
    },
    selectedTextStyle: {
        color: '#00adff'
    },
    activeBackgroundColor: {
        borderRadius: theme.sizes.radius,

        shadowColor: theme.colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    }
});