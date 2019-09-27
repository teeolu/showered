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
	View
} from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

import { Block, Card, Text, Icon, Label } from "../../components";
import * as theme from "../../constants/theme";
import { articlesInfo } from "../../constants/mocks";
import { marketplaceStatus } from "../../modules/marketPlace/reducers";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.navigateTo = this.navigateTo.bind(this);
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

	addMarketplace = () => {
		return (
			<TouchableOpacity onPress={() => this.navigateTo("UpsertMarketPlaceContainer")}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						paddingHorizontal: 10,
						paddingVertical: 5,
						justifyContent: "center",
						borderWidth: 1,
						borderColor: theme.colors.blue,
						borderRadius: 3,
						alignItems: "center"
					}}>
					<MaterialIcons
						name="add"
						style={{ marginRight: 5 }}
						color={theme.colors.blue}
						size={theme.sizes.font * 2}
					/>
					<Text style={{ color: theme.colors.blue }}>Market place</Text>
				</View>
			</TouchableOpacity>
		);
	};

	setCurrentMarketplace = marketPlace => {
		this.props.requestSetCurrentMarketplace({
			marketPlace: marketPlace.marketPlaceAsAdmin,
			navigation: this.props.navigation,
			navigateTo: "MarketplaceDetails"
		});
	};

	navigateTo = (to, params) => {
		this.props.navigation.navigate(to, params);
	};

	render() {
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
						title="MARKET PLACE"
						style={[styles.margin, { marginTop: 18 }]}
						headingRight={this.addMarketplace()}>
						{marketPlaceLoading &&
						marketPlaceRequest === marketplaceStatus.getMarketPlace ? (
							<ActivityIndicator size="large" color="blue" />
						) : (
							<>
								{userMarketplaceData.length > 0 ? (
									userMarketplaceData.map(item => {
										return (
											<Block key={item._id} style={styles.driver}>
												<TouchableOpacity
													onPress={() => this.setCurrentMarketplace(item)}>
													<Block row center>
														<View style={{ marginRight: 15 }}>
															<Image
																style={styles.avatar}
																source={{
																	uri:
																		item.marketPlaceAsAdmin
																			.uploadedImageArray[0].secureUrl
																}}
															/>
														</View>
														<Block>
															<Text h4>
																{item.marketPlaceAsAdmin.marketPlaceName}
															</Text>
															<Text paragraph color="gray">
																{item.marketPlaceAsAdmin.email}
															</Text>
														</Block>
														<Block>
															<Text
																paragraph
																right
																color={
																	item.marketPlaceAsAdmin.publish
																		? theme.colors.green
																		: theme.colors.red
																}>
																{item.marketPlaceAsAdmin.publish
																	? "active"
																	: "inactive"}
															</Text>
															<Text paragraph right color="black">
																$6,432
															</Text>
														</Block>
													</Block>
												</TouchableOpacity>
											</Block>
										);
									})
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
