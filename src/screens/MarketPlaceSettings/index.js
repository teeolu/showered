import React, { PureComponent } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList
} from "react-native";
import {
	FontAwesome,
	Feather,
	AntDesign,
	MaterialIcons,
	Foundation,
	MaterialCommunityIcons
} from "react-native-vector-icons";
import { theme } from "../../constants";

const settingsList = [
	{
		id: 1,
		name: "Admin settings",
		goto: "AdminSetting",
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
		goto: "StaffSetting",
		icon: (
			<AntDesign
				name="team"
				color={theme.colors.lightblue}
				size={theme.sizes.font * 2}
			/>
		)
	},
	{
		id: 3,
		name: "Activities",
		icon: (
			<Feather
				name="activity"
				color={theme.colors.gray}
				size={theme.sizes.font * 2}
			/>
		)
	},
	{
		id: 4,
		name: "Payment settings",
		icon: (
			<MaterialIcons
				name="payment"
				color={theme.colors.yellow}
				size={theme.sizes.font * 2}
			/>
		)
	},
	{
		id: 5,
		name: "Setup 2fa",
		icon: (
			<MaterialIcons
				name="security"
				color={theme.colors.red}
				size={theme.sizes.font * 2}
			/>
		)
	},
	{
		id: 6,
		name: "Notifications",
		icon: (
			<MaterialIcons
				name="notifications-active"
				color={theme.colors.blue}
				size={theme.sizes.font * 2}
			/>
		)
	},
	{
		id: 7,
		name: "Income",
		icon: (
			<FontAwesome
				name="money"
				color={theme.colors.yellow}
				size={theme.sizes.font * 2}
			/>
		)
	},
	{
		id: 8,
		name: "More settings",
		isOwner: true,
		goto: "MoreMarketplaceSetting",
		icon: (
			<Foundation
				name="alert"
				color={theme.colors.red}
				size={theme.sizes.font * 2}
			/>
		)
	}
];

export default class MarketPlaceSetting extends PureComponent {
	renderItem = ({ item }) => {
		const { userdata, currentMarketplace } = this.props;
		if (item.isOwner && !(userdata._id === currentMarketplace.owner))
			return null;

		return (
			<TouchableOpacity
				onPress={() => this.props.navigation.navigate(item.goto)}>
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
		return (
			<View style={{ flex: 1 }}>
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
