import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, ImageBackground, Image } from "react-native";

import { theme } from "../constants";
import { Button } from ".";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const routes = [
	{ navigateTo: "Overview", screen: "Home" },
	{ navigateTo: "Browse", screen: "Browse places" },
	{ navigateTo: "Settings", screen: "Settings" }
];

export default class DrawerComponent extends Component {
	navigateToScreen = route => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<ImageBackground
						source={{
							uri: "https://source.unsplash.com/1600x900/?joy,love,happiness"
						}}
						style={{
							flex: 1,
							width: 280,
							justifyContent: "flex-end"
						}}>
						<TouchableWithoutFeedback
							onPress={this.navigateToScreen("UserProfile")}
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center"
							}}>
							<Image
								source={{
									uri: "https://source.unsplash.com/1600x900/?female"
								}}
								style={{
									width: 60,
									height: 60,
									borderRadius: 30,
									backgroundColor: "red",
									margin: 10
								}}
							/>
							<View>
								<Text h3 style={{ color: "#fff", fontSize: 18 }}>
									Olusola Oyinloye
								</Text>
								<Text h3 style={{ color: "#fff", fontSize: 12 }}>
									View profile
								</Text>
							</View>
						</TouchableWithoutFeedback>
					</ImageBackground>
				</View>
				<View style={styles.screenContainer}>
					{routes.map(route => (
						<View
							key={route.navigateTo}
							style={[
								styles.screenStyle,
								this.props.activeItemKey == route.navigateTo
									? styles.activeBackgroundColor
									: null
							]}>
							<Text
								style={[
									styles.screenTextStyle,
									this.props.activeItemKey == route.navigateTo
										? styles.selectedTextStyle
										: null
								]}
								onPress={this.navigateToScreen(route.navigateTo)}>
								{route.screen}
							</Text>
						</View>
					))}
					<Button
						full
						style={{ marginBottom: 12, width: "100%" }}
						onPress={this.navigateToScreen("UpsertMarketPlaceContainer")}
						isLoading={false}>
						<Text style={{ color: "white" }} button>
							Add a market place
						</Text>
					</Button>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center"
	},
	headerContainer: {
		height: 200
	},
	headerText: {
		color: "#fff8f8"
	},
	screenContainer: {
		padding: theme.sizes.base,
		backgroundColor: theme.colors.white,
		width: "100%"
	},
	screenStyle: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: theme.sizes.base,
		width: "100%"
	},
	screenTextStyle: {
		fontSize: 20,
		textAlign: "center"
	},
	selectedTextStyle: {
		color: "#00adff"
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
