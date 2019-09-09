import React, { PureComponent } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
	FlatList
} from "react-native";
import {
	FontAwesome,
	Feather,
	AntDesign,
	MaterialIcons,
	Entypo,
	MaterialCommunityIcons
} from "react-native-vector-icons";
import { theme } from "../../../constants";
import { marketplaceStatus } from "../../../modules/marketPlace/reducers";

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

const settingsList = [
	{
		id: 1,
		action: "publish",
		name: publish =>
			publish ? "Unpublish Marketplace" : "Publish Marketplace",
		icon: (
			<MaterialIcons
				name="publish"
				color={theme.colors.blue}
				size={theme.sizes.font * 2}
			/>
		),
		right: publish => (
			<Text
				style={{
					...styles.mblTxt,
					color: publish ? theme.colors.green : theme.colors.red
				}}>
				{publish ? "published" : "unpublished"}
			</Text>
		)
	},
	{
		id: 2,
		action: "delete",
		name: publish => "Delete Marketplace",
		icon: (
			<MaterialIcons
				name="delete-forever"
				color={theme.colors.red}
				size={theme.sizes.font * 2}
			/>
		),
		right: publish => <Text style={styles.mblTxt}>Mobile</Text>
	}
];

export default class MoreMarketPlaceSetting extends PureComponent {
	disableMarketplace = () => {
		const {
			requestDisableMarketplaceAction,
			currentMarketplace,
			marketPlaceAdmins,
			userdata
		} = this.props;
		const admin = marketPlaceAdmins.filter(
			el => el.person._id === userdata._id
		);
		const { _id } = currentMarketplace;
		this.setState({ showAsyncActionLoading: true });
		requestDisableMarketplaceAction({
			adminId: admin._id,
			marketPlaceId: _id
		});
	};

	alertDeleteMarketplace = published => {
		Alert.alert(
			"Are you sure you want to remove this admin",
			[
				"This admin will not belong to this market place any more. You can choose to disable the admin instead",
				"\n\n"
			].join(""),
			[
				{ text: "cancel", style: "cancel" },
				{ text: "remove", onPress: () => this.removeAdmin(published) }
			]
		);
	};

	alertUnpublishMarketplace = published => {
		Alert.alert(
			`${published ? "Unpublish" : "Publish"} this Marketplace`,
			[
				`${
					published
						? "This marketplace and all it's services will not be seen and accessible by the public"
						: "This marketplace and all it's services will be seen and accessible by the public"
				}`,
				"\n\n"
			].join(""),
			[
				{ text: "cancel", style: "cancel" },
				{
					text: `${published ? "Unpublish" : "Publish"}`,
					onPress: () => this.disableMarketplace(published)
				}
			]
		);
	};

	action = (action, published) => {
		if (action === "publish") {
			this.alertUnpublishMarketplace(published);
		} else if (action === "delete") {
			this.alertDeleteMarketplace(published);
		}
	};
	renderItem = ({ item }) => {
		const { currentMarketplace } = this.props;
		return (
			<TouchableOpacity
				onPress={() => this.action(item.action, currentMarketplace.publish)}>
				<View style={styles.row}>
					{item.icon}
					<View>
						<View style={styles.nameContainer}>
							<Text
								style={styles.nameTxt}
								numberOfLines={1}
								ellipsizeMode="tail">
								{item.name(currentMarketplace.publish)}
							</Text>
							{item.right ? item.right(currentMarketplace.publish) : null}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	isLoading = status => {
		const { isLoading, request } = this.props;
		const loading = isLoading && request === status;
		return loading;
	};

	render() {
		const { disableMarketplace } = marketplaceStatus;
		return (
			<View style={{ flex: 1 }}>
				{this.isLoading(disableMarketplace) && (
					<View style={styles.overlay}>
						<ActivityIndicator size="large" color="#fff" />
					</View>
				)}
				<FlatList
					extraData={{}}
					data={settingsList}
					keyExtractor={item => {
						return item.id.toString();
					}}
					renderItem={this.renderItem}
				/>
			</View>
		);
	}
}
