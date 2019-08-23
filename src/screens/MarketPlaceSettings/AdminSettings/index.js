import React, { PureComponent } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList
} from "react-native";
import {
	AntDesign,
	MaterialCommunityIcons,
	MaterialIcons
} from "react-native-vector-icons";
import { theme } from "../../../constants";
import AddAdminModal from "./AddAdminModal";
import { validateInput } from "../../../utils/inputFunctions";
import { marketPlaceSettingsStatus } from "../../../modules/marketPlaceSettingsAction/reducers";

export default class AdminSettings extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			calls: [
				{
					id: 1,
					name: "Add an admin",
					icon: (
						<MaterialCommunityIcons
							name="account-star"
							color={theme.colors.teal}
							size={theme.sizes.font * 2}
						/>
					)
				},
				{
					id: 2,
					name: "Staff settings",
					icon: (
						<AntDesign
							name="team"
							color={theme.colors.lightblue}
							size={theme.sizes.font * 2}
						/>
					)
				}
			],
			formError: false,
			errorMessage: "",
			addAdminVisible: false,
			fields: {
				email: {
					value: "",
					error: true,
					errorMessage: "",
					rules: {
						email: true
					}
				}
			}
		};
	}

	toggleModal = () => {
		this.setState(state => ({
			addAdminVisible: !state.addAdminVisible
		}));
	};

	handleChange = type => text => {
		let newState = { ...this.state };
		newState.fields[type] = {
			...newState.fields[type],
			value: text,
			error: false,
			errorMessage: ""
		};

		this.setState(prevState => ({
			...prevState,
			...newState,
			formError: false,
			errorMessage: ""
		}));
	};

	blurReact = ({ error, errorMessage, type }) => {
		let newState = { ...this.state };
		newState.fields[type] = { ...newState.fields[type], error, errorMessage };

		this.setState(prevState => ({
			...prevState,
			...newState
		}));
	};

	handleSubmit = event => {
		const { requestAddMarketplaceAdminAction, navigation } = this.props;
		const { marketPlaceInfo } = navigation.getParam("item", {});

		// var { error } = validateInput(this.state.fields);
		// if (error) {
		// 	return this.setState({
		// 		formError: true,
		// 		errorMessage: "Ensure your inputs are valid"
		// 	});
		// }

		requestAddMarketplaceAdminAction({
			dataToSubmit: {
				userEmail: "oyinloye.olusola.taiwo@gmail.com", //this.state.fields.email.value.toLowerCase(),
				marketPlaceId: marketPlaceInfo._id
			},
			navigation,
			navigateTo: "Feedback"
		});
	};

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity>
				<View style={styles.row}>
					{item.icon}
					<View>
						<View style={styles.nameContainer}>
							<Text
								style={styles.nameTxt}
								numberOfLines={1}
								ellipsizeMode="tail">
								{item.name}
							</Text>
							<Text style={styles.mblTxt}>Mobile</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		let { isLoading, request, addAdminError } = this.props;
		console.log("value state ", this.state.fields.email.value);
		isLoading =
			isLoading && request === marketPlaceSettingsStatus.addMarketplaceAdmin;
		return (
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={this.toggleModal}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							paddingHorizontal: 10,
							paddingVertical: 5,
							borderWidth: 1,
							borderColor: theme.colors.black2,
							borderRadius: 3,
							margin: 20,
							width: 150,
							alignItems: "center"
						}}>
						<MaterialIcons
							name="add"
							style={{ marginRight: 5 }}
							color={theme.colors.black2}
							size={theme.sizes.font * 2}
						/>
						<Text
							style={{
								color: theme.colors.black2,
								fontSize: theme.sizes.font * 1.5
							}}>
							Admin
						</Text>
					</View>
				</TouchableOpacity>
				<FlatList
					extraData={this.state}
					data={this.state.calls}
					keyExtractor={item => {
						return item.id.toString();
					}}
					renderItem={this.renderItem}
				/>
				<AddAdminModal
					toggleModal={this.toggleModal}
					isVisible={this.state.addAdminVisible}
					handleChange={this.handleChange}
					blur={arg => this.blurReact(arg)}
					inputInfo={this.state.fields}
					handleSubmit={this.handleSubmit}
					isLoading={isLoading}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: theme.colors.gray3,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		padding: 10,
		marginLeft: 20
	},
	pic: {
		borderRadius: 30,
		width: 60,
		height: 60
	},
	nameContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: 280
	},
	nameTxt: {
		marginLeft: 15,
		fontWeight: "600",
		color: theme.colors.black2,
		fontSize: 18,
		width: 170
	},
	mblTxt: {
		fontWeight: "200",
		color: "#777",
		fontSize: 13
	},
	msgContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
	msgTxt: {
		fontWeight: "400",
		color: "#008B8B",
		fontSize: 12,
		marginLeft: 15
	}
});
