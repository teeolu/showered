import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	ListView,
	TouchableOpacity,
	View,
	Image,
	Text,
	TouchableHighlight
} from "react-native";
import { theme } from "../../constants";

export default class Feedback extends Component {
	render() {
		const { navigation } = this.props;
		let { navigateTo, type, title, text, btnText, data } = navigation.getParam(
			"item",
			{}
		);
		return (
			<View style={styles.container}>
				{type === "success" && (
					<Image
						style={styles.icon}
						source={{
							uri: "https://png.icons8.com/good-quality/ultraviolet/200/3498db"
						}}
					/>
				)}
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>
					{text ||
						"A mail has been sent to your email! verify your email, then proceed to Login"}
				</Text>
				<TouchableHighlight
					style={[styles.buttonContainer, styles.loginButton]}
					onPress={() => navigation.navigate(navigateTo, { item: data })}>
					<Text style={styles.buttonText}>
						{btnText || "Email has been verified"}
					</Text>
				</TouchableHighlight>
				<Text style={styles.description}>
					Didn't get an email? <Text style={styles.resend}>Resend Email</Text>
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EEEEEE",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 50
	},
	icon: {
		width: 150,
		height: 150
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		marginTop: 22,
		color: "#5F6D7A"
	},
	description: {
		marginTop: 20,
		textAlign: "center",
		color: "#A9A9A9",
		fontSize: 16,
		margin: 40
	},
	resend: {
		color: theme.colors.blue,
		textDecorationLine: "underline",
		textDecorationColor: theme.colors.blue
	},
	buttonContainer: {
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		width: 250,
		borderRadius: 30
	},
	loginButton: {
		backgroundColor: "#3498db"
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 20
	}
});
