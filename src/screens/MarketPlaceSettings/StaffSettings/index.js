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
import AddAdminModal from "./AddStaffModal";
import { validateInput } from "../../../utils/inputFunctions";
import { marketPlaceSettingsStatus } from "../../../modules/marketPlaceSettingsAction/reducers";
import ModalDropdown from "../../../components/ModalDropdown";
const width = Dimensions.get("window").width;

export default class StaffSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAsyncActionLoading: false,
			formError: false,
			errorMessage: "",
			addStaffVisible: false,
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
			addStaffVisible: !state.addStaffVisible
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
		const {
			requestAddMarketplaceStaffAction,
			navigation,
			currentMarketplace
		} = this.props;

		var { error } = validateInput(this.state.fields);
		if (error) {
			return this.setState({
				formError: true,
				errorMessage: "Ensure your inputs are valid"
			});
		}

		requestAddMarketplaceStaffAction({
			dataToSubmit: {
				userEmail: this.state.fields.email.value.toLowerCase(),
				marketPlaceId: currentMarketplace._id
			},
			navigation,
			navigateTo: "Feedback",
			data: currentMarketplace
		});
	};

	removeStaff = staff => {
		const {
			requestRemoveMarketplaceStaffAction,
			currentMarketplace: { _id }
		} = this.props;
		this.setState({ showAsyncActionLoading: true });
		requestRemoveMarketplaceStaffAction({
			staffId: staff._id,
			marketPlaceId: _id
		});
	};

	disableStaff = staff => {
		const {
			requestDisableMarketplaceStaffAction,
			currentMarketplace: { _id }
		} = this.props;
		this.setState({ showAsyncActionLoading: true });
		requestDisableMarketplaceStaffAction({
			staffId: staff._id,
			marketPlaceId: _id
		});
	};

	showRemoveStaffModal = staff => {
		Alert.alert(
			"Are you sure you want to remove this staff",
			[
				"This staff will not belong to this market place any more. You can choose to disable the staff instead",
				"\n\n"
			].join(""),
			[
				{ text: "cancel", style: "cancel" },
				{ text: "remove", onPress: () => this.removeStaff(staff) }
			]
		);
	};

	showDisableStaffModal = staff => {
		console.log("staff id ", staff);
		Alert.alert(
			`Are you sure you want to ${
				staff.isActive ? "deactivate" : "activate"
			} this staff`,
			[
				`This staff will ${
					staff.isActive
						? "not be able to perform his administrative activities when disabled"
						: "be able to continue his administrative activities when activated"
				}`,
				"\n\n"
			].join(""),
			[
				{ text: "cancel", style: "cancel" },
				{
					text: staff.isActive ? "deactivate" : "activate",
					onPress: () => this.disableStaff(staff)
				}
			]
		);
	};

	renderStaffsList = ({ item }) => {
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
						type="staffs"
						removeStaff={id => this.showRemoveStaffModal(id)}
						disableStaff={id => this.showDisableStaffModal(id)}
						adminDetails={item}
					/>
				</View>
			</View>
		);
	};

	showRemovePendingStaffModal = admin => {
		Alert.alert(
			"Are you sure you want to remove this user from your invite list",
			[
				"This user will not be able to join this market place as anstaff any more",
				"\n\n"
			].join(""),
			[
				{ text: "cancel", style: "cancel" },
				{ text: "remove", onPress: () => this.removePendingStaff(admin) }
			]
		);
	};

	removePendingStaff = user => {
		const {
			requestRemovePendingMarketplaceStaffAction,
			currentMarketplace
		} = this.props;
		const { _id } = currentMarketplace;
		this.setState({ showAsyncActionLoading: true });
		requestRemovePendingMarketplaceStaffAction({
			userId: user._id,
			marketPlaceId: _id
		});
	};

	renderPendingStaffList = ({ item }) => {
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
							type="pendingStaffs"
							removePendingStaff={id => this.showRemovePendingStaffModal(id)}
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
		let {
				isError,
				requestError,
				currentMarketplace,
				marketPlaceStaffs,
				marketPlacePendingStaffs
			} = this.props,
			{
				addMarketplaceStaff,
				disableMarketplaceStaff,
				removeMarketplaceStaff,
				removePendingMarketplaceStaff
			} = marketPlaceSettingsStatus;
		return (
			<View style={{ flex: 1 }}>
				{(this.isLoading(disableMarketplaceStaff) ||
					this.isLoading(removeMarketplaceStaff) ||
					this.isLoading(removePendingMarketplaceStaff)) && (
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
							Staff
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
									Staffs
								</Text>
								{/* <Text style={styles.mblTxt}>Mobile</Text> */}
							</View>
						</View>
					</TouchableOpacity>
					<FlatList
						extraData={this.state}
						data={marketPlaceStaffs}
						keyExtractor={item => {
							return item._id;
						}}
						renderItem={this.renderStaffsList}
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
						data={marketPlacePendingStaffs}
						keyExtractor={item => {
							return item._id;
						}}
						renderItem={this.renderPendingStaffList}
					/>
				</View>
				<AddAdminModal
					toggleModal={this.toggleModal}
					isVisible={this.state.addStaffVisible}
					handleChange={this.handleChange}
					blur={arg => this.blurReact(arg)}
					inputInfo={this.state.fields}
					handleSubmit={this.handleSubmit}
					isLoading={this.isLoading(addMarketplaceStaff)}
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
