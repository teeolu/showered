import React, { Component } from "react";
import {
	TouchableOpacity,
	Image,
	SafeAreaView,
	ImageBackground,
	ScrollView,
	Dimensions,
	StyleSheet,
	ActivityIndicator,
	Animated,
	View,
	FlatList
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";

import { Block, Card, Text, Icon, Label } from "../../components";
import * as theme from "../../constants/theme";
import { articlesInfo } from "../../constants/mocks";
import { categoryNames } from "../UpsertMarketPlace/SelectCategory";
import { marketplaceStatus } from "../../modules/marketPlace/reducers";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

class UserProfile extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeftContainerStyle: {
			paddingLeft: 24
		},
		headerRightContainerStyle: {
			paddingRight: 24
		},
		headerLeft: (
			<TouchableOpacity onPress={navigation.openDrawer}>
				<Icon menu />
			</TouchableOpacity>
		),
		headerRight: (
			<TouchableOpacity>
				<Icon notification />
			</TouchableOpacity>
		),
		headerTitle: (
			<Block row middle>
				<Text h4>Overview</Text>
			</Block>
		)
	});

	constructor(props) {
		super(props);
		this.navigateToBrowse = this.navigateToBrowse.bind(this);
	}

	componentDidMount() {
		this.props.requestGetUserMarketplaceAction();
	}

	renderHeading = () => {
		const item = articlesInfo[2];
		const {
			userdata: { lastName, firstName, email }
		} = this.props;
		return (
			<View style={[styles.column, styles.destinations]}>
				<TouchableWithoutFeedback>
					<ImageBackground
						style={styles.destination}
						source={{ uri: item.preview }}>
						<View style={styles.userInfo}>
							<Image
								source={{
									uri: "https://source.unsplash.com/1600x900/?gravatar"
								}}
								style={{
									width: 60,
									height: 60,
									borderRadius: 30,
									marginRight: 10,
									backgroundColor: "red"
								}}
							/>
							<View>
								<Text h3 style={{ color: "#fff", fontSize: 22 }}>
									{`${firstName} ${lastName}`}
								</Text>
								<Text h3 style={{ color: "#fff", fontSize: 14 }}>
									{email}
								</Text>
							</View>
						</View>
					</ImageBackground>
				</TouchableWithoutFeedback>
			</View>
		);
	};

	navigateToBrowse = (to, params) => {
		this.props.navigation.navigate(to, params);
	};

	render() {
		const item = articlesInfo[2];
		const {
			marketPlaceLoading,
			userMarketplaceData,
			marketPlaceRequest
		} = this.props;
		return (
			<SafeAreaView style={styles.overview}>
				<ScrollView>
					{this.renderHeading()}

					<Card
						title="TRIPS BY TYPE"
						style={[styles.margin, { marginTop: 18 }]}>
						<Block>
							<Text>Chart</Text>
						</Block>
						<Block row space="between" style={{ marginTop: 25 }}>
							<Block>
								<Text h2 light>
									1,744
								</Text>
								<Block row center>
									<Label blue />
									<Text paragraph color="gray">
										Comfort
									</Text>
								</Block>
							</Block>
							<Block>
								<Text h2 light>
									2,312
								</Text>
								<Block row center>
									<Label purple />
									<Text paragraph color="gray">
										Premium
									</Text>
								</Block>
							</Block>
						</Block>
					</Card>

					<Card
						title="YOUR MARKET PLACE"
						style={[styles.margin, { marginTop: 18 }]}>
						{marketPlaceLoading &&
						marketPlaceRequest === marketplaceStatus.getMarketPlace ? (
							<ActivityIndicator size="large" color="blue" />
						) : (
							<>
								{userMarketplaceData.length > 0 ? (
									userMarketplaceData.map(item => (
										<Block key={item._id} style={styles.driver}>
											<TouchableOpacity
												onPress={() =>
													this.navigateToBrowse("CategoryDetails", { item })
												}>
												<Block row center>
													<View style={{ marginRight: 15 }}>
														<Image
															style={styles.avatar}
															source={{
																uri: item.uploadedImageArray[0].secureUrl
															}}
														/>
													</View>
													<Block>
														<Text h4>{item.marketPlaceName}</Text>
														<Text paragraph color="gray">
															{item.email}
														</Text>
													</Block>
													<Block>
														<Text paragraph right color="black">
															$6,432
														</Text>
														<Text paragraph right color="gray">
															1,232 miles
														</Text>
													</Block>
												</Block>
											</TouchableOpacity>
										</Block>
									))
								) : (
									<Text>You are not offering any service yet</Text>
								)}
							</>
						)}
					</Card>
				</ScrollView>
			</SafeAreaView>
		);
	}
}
const styles = StyleSheet.create({
	avatar: {
		width: theme.sizes.padding,
		height: theme.sizes.padding,
		paddingRight: 35,
		borderRadius: theme.sizes.padding / 2
	},
	margin: {
		marginHorizontal: 25
	},
	driver: {
		marginBottom: 11
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24
	},
	column: {
		flexDirection: "column"
	},
	row: {
		flexDirection: "row"
	},
	destination: {
		width: width,
		height: width * 0.6,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		flex: 1
	},
	userInfo: {
		marginHorizontal: theme.sizes.margin,
		paddingVertical: theme.sizes.padding * 0.66,
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	}
});

export default UserProfile;
