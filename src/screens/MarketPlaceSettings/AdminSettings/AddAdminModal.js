import React, { Component } from "react";

import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import { Feather } from "react-native-vector-icons";
import { Button, Text, Input } from "../../../components";
import { theme } from "../../../constants";

const { height } = Dimensions.get("screen");

export default class AddAdminModal extends Component {
	render() {
		return (
			<Modal
				isVisible={this.props.isVisible}
				useNativeDriver
				style={{
					margin: 0,
					paddingTop: 100,
					paddingHorizontal: 30,
					justifyContent: "flex-start",
					backgroundColor: theme.colors.white,
					height
				}}
				hideModalContentWhileAnimating={true}
				onBackButtonPress={this.props.handleChange}>
				<Feather
					name="x"
					onPress={this.props.toggleModal}
					style={{ marginBottom: 15 }}
					color={theme.colors.blue}
					size={theme.sizes.font * 3}
				/>
				<Text h4>Input email address of new admin</Text>
				<Text style={{ marginVertical: 30 }}>
					Note that you can only add somebody that is already registered on
					showered
				</Text>
				<Input
					full
					blur={this.props.blur}
					inputInfo={this.props.inputInfo}
					email
					type="email"
					value={this.props.inputInfo.email.value}
					label="Email address"
					onChangeText={this.props.handleChange("email")}
					style={{ marginBottom: 25 }}
				/>
				{this.props.isError && (
					<Text
						style={{
							marginTop: 30,
							textAlign: "center",
							marginBottom: 10,
							color: "red"
						}}>
						{this.props.requestError
							? `${this.props.requestError}`
							: "An error occured"}
					</Text>
				)}
				<Button
					full
					isLoading={this.props.isLoading}
					style={{ width: "50%", alignSelf: "flex-end" }}
					onPress={this.props.handleSubmit}>
					<Text button>Submit</Text>
				</Button>
			</Modal>
		);
	}
}
