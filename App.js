import React from "react";
import { Provider } from "react-redux";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";
import store from "./src/modules/store";

export default class App extends React.Component {
	state = {
		isLoadingComplete: false
	};

	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					startAsync={this._loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			);
		} else {
			return (
				<Provider store={store}>
					<View style={styles.container}>
						{Platform.OS === "ios" && <StatusBar barStyle="default" />}
						<AppNavigator />
					</View>
				</Provider>
			);
		}
	}

	_loadResourcesAsync = async () => {
		return Promise.all([
			Asset.loadAsync([require("./src/assets/images/Base/Logo.png")]),
			Font.loadAsync({
				// This is the font that we are using for our tab bar
				// ...Icon.Ionicons.font,
				"Montserrat-Black": require("./src/assets/fonts/Montserrat-Black.ttf"),
				"Montserrat-BlackItalic": require("./src/assets/fonts/Montserrat-BlackItalic.ttf"),
				"Montserrat-Bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
				"Montserrat-BoldItalic": require("./src/assets/fonts/Montserrat-BoldItalic.ttf"),
				"Montserrat-ExtraBold": require("./src/assets/fonts/Montserrat-ExtraBold.ttf"),
				"Montserrat-SemiBold": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
				"Montserrat-ExtraBoldItalic": require("./src/assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
				"Montserrat-SemiBoldItalic": require("./src/assets/fonts/Montserrat-SemiBoldItalic.ttf"),
				"Montserrat-Italic": require("./src/assets/fonts/Montserrat-Italic.ttf"),
				"Montserrat-Light": require("./src/assets/fonts/Montserrat-Light.ttf"),
				"Montserrat-ExtraLight": require("./src/assets/fonts/Montserrat-ExtraLight.ttf"),
				"Montserrat-LightItalic": require("./src/assets/fonts/Montserrat-LightItalic.ttf"),
				"Montserrat-ExtraLightItalic": require("./src/assets/fonts/Montserrat-ExtraLightItalic.ttf"),
				"Montserrat-Medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
				"Montserrat-MediumItalic": require("./src/assets/fonts/Montserrat-MediumItalic.ttf"),
				"Montserrat-Regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
				"Montserrat-Thin": require("./src/assets/fonts/Montserrat-Thin.ttf"),
				"Montserrat-ThinItalic": require("./src/assets/fonts/Montserrat-ThinItalic.ttf")
			})
		]);
	};

	_handleLoadingError = error => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error);
	};

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
