import React, { Component } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	TextInput,
	Dimensions
} from "react-native";
import Text from "./Text";
import * as theme from "../constants/theme";

const { width } = Dimensions.get("window");

export default class Input extends Component {
	handleBlur = type => event => {
		var properties = { ...this.props.inputInfo };
		var { rules, value } = properties[this.props.type];

		const setError = error => {
			this.props.blur({ ...error, type });
		};

		if (Object.keys(rules).length === 0) {
			return setError({ error: false, errorMessage: "" });
		}

		if (value.length === 0) {
			return setError({ error: true, errorMessage: "Field can't be empty" });
		}
		if (rules.maxLength && value.length > rules.maxLength) {
			return setError({ error: true, errorMessage: "value too long" });
		}
		if (rules.minLength && value.length < rules.minLength) {
			return setError({ error: true, errorMessage: "value too short" });
		}
		if (rules.email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var valid = re.test(value);
			if (!valid) {
				return setError({
					error: true,
					errorMessage: "Email must be a valid mail"
				});
			}
		}
		if (rules.password) {
			var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
			var valid = re.test(value);
			if (!valid) {
				return setError({
					error: true,
					errorMessage:
						"Atleast a number, a capital letter, and minimum of 8 characters"
				});
			}
		}
		if (rules.confirmPassword) {
			if (value !== properties["password"].value) {
				return setError({
					error: true,
					errorMessage: "Must be equal to password input"
				});
			}
		}
		if (rules.length) {
			if (value.length != rules.length) {
				return setError({
					error: true,
					errorMessage: "Your phone number should look like +2348012345678"
				});
			}
		}
		if (rules.hasPrenumber) {
			var index = value.split("+234");

			if (index[0] != "") {
				return setError({
					error: true,
					errorMessage: "Your phone number should start with +234"
				});
			}
		}

		return setError({ error: false, errorMessage: "" });
	};

	render() {
		const {
			label,
			rightLabel,
			type,
			description,
			autoFocus,
			multiline,
			numberOfLines,
			inputInfo = {},
			subInputText,
			full,
			email,
			phone,
			number,
			password,
			onPress,
			pressAble,
			style,
			...props
		} = this.props;
		const inputStyles = [styles.input, full && styles.full, style];

		const inputType = email
			? "email-address"
			: number
			? "numeric"
			: phone
			? "phone-pad"
			: "default";

		return (
			<View>
				<View style={styles.labelContainer}>
					<View style={{ ...styles.full }}>
						<Text caption medium style={styles.label}>
							{label}
						</Text>
						{subInputText ? subInputText : null}
					</View>
					{rightLabel}
				</View>
				{inputInfo[type] &&
					inputInfo[type].error &&
					inputInfo[type].errorMessage.length > 0 && (
						<Text paragraph color="black3">
							{inputInfo[type].errorMessage}
						</Text>
					)}
				{!pressAble ? (
					<TextInput
						{...props}
						style={[inputStyles]}
						secureTextEntry={password}
						autoCapitalize="none"
						autoCorrect={false}
						multiline={multiline || false}
						numberOfLines={multiline && 10}
						autoFocus={autoFocus && true}
						onBlur={this.handleBlur(type)}
						keyboardType={inputType}
					/>
				) : (
					<View
						style={{
							width: "100%",
							height: 45,
							position: "relative",
							...style
						}}>
						<TextInput
							style={[styles.input, style.full]}
							secureTextEntry={password}
							autoCapitalize="none"
							autoCorrect={false}
							multiline={multiline || false}
							numberOfLines={multiline && 10}
							autoFocus={autoFocus && true}
							onBlur={this.handleBlur(type)}
							keyboardType={inputType}
							{...props}
						/>
						<TouchableOpacity
							onPress={onPress}
							style={{
								position: "absolute",
								top: 0,
								right: 0,
								left: 0,
								bottom: 0
							}}
						/>
					</View>
				)}
			</View>
		);
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
		paddingHorizontal: 16
	},
	label: {
		textTransform: "uppercase"
	},
	labelContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8
	},
	full: {
		width: width - 50
	}
});
