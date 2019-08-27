import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
	Alert,
	FlatList
} from "react-native";
import { MaterialIcons, Entypo } from "react-native-vector-icons";
import { theme } from "../../../constants";
import AddAdminModal from "./AddAdminModal";
import { validateInput } from "../../../utils/inputFunctions";
import { marketPlaceSettingsStatus } from "../../../modules/marketPlaceSettingsAction/reducers";
import ModalDropdown from "./ModalDropdown";
const width = Dimensions.get("window").width;

export default class AdminSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAsyncActionLoading: false,
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

		this.setState({
			...newState,
			formError: false,
			errorMessage: ""
		});
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

		var { error } = validateInput(this.state.fields);
		if (error) {
			return this.setState({
				formError: true,
				errorMessage: "Ensure your inputs are valid"
			});
		}

		requestAddMarketplaceAdminAction({
			dataToSubmit: {
				userEmail: this.state.fields.email.value.toLowerCase(),
				marketPlaceId: marketPlaceInfo._id
			},
			navigation,
			navigateTo: "Feedback",
			data: marketPlaceInfo
		});
	};

	removeAdmin = admin => {
		const { requestRemoveMarketplaceAdminAction, navigation } = this.props;
		const {
			marketPlaceInfo: { _id }
		} = navigation.getParam("item", {});
		this.setState({ showAsyncActionLoading: true });
		requestRemoveMarketplaceAdminAction({
			adminId: admin._id,
			marketPlaceId: _id
		});
	};

	disableAdmin = admin => {
		const { requestDisableMarketplaceAdminAction, navigation } = this.props;
		const {
			marketPlaceInfo: { _id }
		} = navigation.getParam("item", {});
		this.setState({ showAsyncActionLoading: true });
		requestDisableMarketplaceAdminAction({
			adminId: admin._id,
			marketPlaceId: _id
		});
	};

	showRemoveAdminModal = admin => {
		Alert.alert(
			"Are you sure you want to remove this admin",
			[
				"This admin will not belong to this market place any more. You can choose to disable the admin instead",
				"\n\n"
			].join(""),
			[
				{ text: "cancel", style: "cancel" },
				{ text: "remove", onPress: () => this.removeAdmin(admin) }
			]
		);
	};

	showDisableAdminModal = admin => {
		Alert.alert(
			`Are you sure you want to ${
				admin.isActive ? "deactivate" : "activate"
			} this admin`,
			[
				`This admin will ${
					admin.isActive
						? "not be able to perform his administrative activities when disabled"
						: "be able to continue his administrative activities when activated"
				}`,
				"\n\n"
			].join(""),
			[
				{ text: "cancel", style: "cancel" },
				{
					text: admin.isActive ? "deactivate" : "activate",
					onPress: () => this.disableAdmin(admin)
				}
			]
		);
	};

	renderAdminList = ({ item }) => {
		return (
			<View style={{ ...styles.nameContainer, ...styles.row }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center"
					}}>
					<Entypo
						name="dot-single"
						color={item.isActive ? theme.colors.green : theme.colors.red}
						size={theme.sizes.font * 3}
					/>
					<Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
						{`${item.person.firstName} ${item.person.lastName}`}
					</Text>
				</View>
				<View style={styles.row2}>
					<Text style={styles.mblTxt}>owner</Text>
					<ModalDropdown
						type="admins"
						removeAdmin={id => this.showRemoveAdminModal(id)}
						disableAdmin={id => this.showDisableAdminModal(id)}
						adminDetails={item}
					/>
				</View>
			</View>
		);
	};

	renderPendingAdminList = ({ item }) => {
		return (
			<View style={styles.row}>
				<View style={styles.nameContainer}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center"
						}}>
						<Entypo
							name="dot-single"
							color={theme.colors.gray}
							size={theme.sizes.font * 3}
						/>
						<Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
							{`${item.firstName} ${item.lastName}`}
						</Text>
					</View>
					<View style={styles.row2}>
						<Text style={styles.mblTxt}>owner</Text>
						<ModalDropdown
							type="admins"
							removeAdmin={id => this.showRemoveAdminModal(id)}
							disableAdmin={id => this.showDisableAdminModal(id)}
							adminDetails={item}
						/>
					</View>
				</View>
			</View>
		);
	};

	isLoading = status => {
		const { isLoading, request } = this.props;
		const loading = isLoading && request === status;
		return loading;
	};

	render() {
		let { isError, requestError, navigation, marketPlaceAdmins } = this.props,
			{ marketPlaceInfo } = navigation.getParam("item", {}),
			{
				addMarketplaceAdmin,
				disableMarketplaceAdmin,
				removeMarketplaceAdmin
			} = marketPlaceSettingsStatus;
		return (
			<View style={{ flex: 1 }}>
				{(this.isLoading(disableMarketplaceAdmin) ||
					this.isLoading(removeMarketplaceAdmin)) && (
					<View style={styles.overlay}>
						<ActivityIndicator size="large" color="#fff" />
					</View>
				)}
				<TouchableOpacity onPress={this.toggleModal}>
					<View style={styles.addAdmin}>
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
				<View>
					<TouchableOpacity>
						<View style={styles.row}>
							<View>
								<Text
									style={styles.nameTxt}
									numberOfLines={1}
									ellipsizeMode="tail">
									Admins
								</Text>
								{/* <Text style={styles.mblTxt}>Mobile</Text> */}
							</View>
						</View>
					</TouchableOpacity>
					<FlatList
						extraData={this.state}
						data={marketPlaceAdmins}
						keyExtractor={item => {
							return item._id.toString();
						}}
						renderItem={this.renderAdminList}
					/>
				</View>
				<View>
					<TouchableOpacity>
						<View style={styles.row}>
							<View>
								<Text
									style={styles.nameTxt}
									numberOfLines={1}
									ellipsizeMode="tail">
									Pending admins
								</Text>
							</View>
						</View>
					</TouchableOpacity>
					<FlatList
						extraData={this.state}
						data={marketPlaceInfo.pendingAdmins}
						keyExtractor={item => {
							return item._id.toString();
						}}
						renderItem={this.renderPendingAdminList}
					/>
				</View>
				<AddAdminModal
					toggleModal={this.toggleModal}
					isVisible={this.state.addAdminVisible}
					handleChange={this.handleChange}
					blur={arg => this.blurReact(arg)}
					inputInfo={this.state.fields}
					handleSubmit={this.handleSubmit}
					isLoading={this.isLoading(addMarketplaceAdmin)}
					isError={isError}
					requestError={requestError}
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
		padding: 5
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 15
	},
	pic: {
		borderRadius: 30,
		width: 60,
		height: 60
	},
	nameContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width
	},
	nameTxt: {
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
	},
	addAdmin: {
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
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.7)",
		zIndex: 100000,
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
});
