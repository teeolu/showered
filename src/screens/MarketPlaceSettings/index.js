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
	MaterialCommunityIcons
} from "react-native-vector-icons";
import { theme } from "../../constants";

export default class MarketPlaceSetting extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			calls: [
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
				}
			]
		};
	}

	renderItem = ({ item }) => {
		const { marketPlaceInfo } = this.props.navigation.getParam("item", {});
		return (
			<TouchableOpacity
				onPress={() =>
					this.props.navigation.navigate(item.goto, {
						item: { marketPlaceInfo }
					})
				}>
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
					extraData={this.state}
					data={this.state.calls}
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
