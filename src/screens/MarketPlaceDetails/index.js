import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Animated,
	Image,
	Dimensions,
	ScrollView,
	ActivityIndicator,
	TouchableWithoutFeedback,
	TouchableOpacity,
	ImageBackground
} from "react-native";
import {
	FontAwesome,
	MaterialIcons,
	Ionicons
} from "react-native-vector-icons";

import { theme } from "../../constants";
import { articlesInfo } from "../../constants/mocks";
import { Card, Block, Text } from "../../components";
import { serviceDetailsStatus } from "../../modules/MarketplaceDetails/reducers";

const { width, height } = Dimensions.get("window");

class MarketPlaceDetails extends Component {
	scrollX = new Animated.Value(0);

	componentDidMount() {
		const {
			navigation,
			requestGetMarketplaceDetailsAction,
			requestGetAdminsMarketplaceAction
		} = this.props;
		const item = navigation.getParam("item");
		requestGetMarketplaceDetailsAction({ marketPlaceId: item._id });
		requestGetAdminsMarketplaceAction({ marketPlaceId: item._id });
	}

	renderDots = () => {
		const { navigation } = this.props;
		const { uploadedImageArray } = navigation.getParam("item", {});
		const dotPosition = Animated.divide(this.scrollX, width);

		return (
			<View style={[styles.flex, styles.row, styles.dotsContainer]}>
				{uploadedImageArray.map((item, index) => {
					const opacity = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [0.5, 1, 0.5],
						extrapolate: "clamp"
					});
					return (
						<Animated.View
							key={`step-${item}-${index}`}
							style={[styles.dots, { opacity }]}
						/>
					);
				})}
			</View>
		);
	};

	renderRatings = rating => {
		const stars = new Array(5).fill(0);
		return stars.map((_, index) => {
			const activeStar = Math.floor(rating) >= index + 1;
			return (
				<FontAwesome
					name="star"
					key={`star-${index}`}
					size={theme.sizes.font}
					color={theme.colors[activeStar ? "active" : "gray"]}
					style={{ marginRight: 4 }}
				/>
			);
		});
	};

	addServiceDetails = authorized => {
		const { _id } = this.props.navigation.getParam("item", {});
		if (!authorized) return null;
		return (
			<TouchableOpacity
				onPress={() =>
					this.navigateTo("ServiceDetails", { marketPlaceId: _id })
				}>
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
					<Text style={{ color: theme.colors.blue }}>Menu</Text>
				</View>
			</TouchableOpacity>
		);
	};

	navigateTo = (to, params) => {
		this.props.navigation.navigate(to, params);
	};

	render() {
		const {
			navigation,
			userdata,
			serviceDetailsRequest,
			marketPlaceAdmins,
			serviceDetailsLoading,
			marketplaceServiceDetailsData
		} = this.props;
		const {
			uploadedImageArray,
			marketPlaceName,
			description
		} = navigation.getParam("item", {});
		const isAdmin = marketPlaceAdmins.some(el => {
			return el.person._id === userdata._id;
		});
		const isStaff = marketPlaceAdmins.some(el => {
			return el.person === userdata._id;
		});
		const article = articlesInfo[0];
		return (
			<ScrollView>
				<View style={styles.flex}>
					<View style={[styles.flex]}>
						<ScrollView
							horizontal
							pagingEnabled
							scrollEnabled
							showsHorizontalScrollIndicator={false}
							decelerationRate={0}
							scrollEventThrottle={16}
							snapToAlignment="center"
							onScroll={Animated.event([
								{ nativeEvent: { contentOffset: { x: this.scrollX } } }
							])}>
							{uploadedImageArray.map((img, index) => (
								<ImageBackground
									key={`${img.publicId}`}
									source={{ uri: img.secureUrl }}
									resizeMode="cover"
									style={{
										width,
										height: width * 0.65,
										display: "flex",
										alignContent: "center"
									}}>
									<TouchableOpacity
										style={{ margin: theme.sizes.margin }}
										onPress={() => navigation.pop()}>
										<Ionicons
											name="ios-arrow-round-back"
											color={theme.colors.blue}
											size={theme.sizes.font * 4}
										/>
									</TouchableOpacity>
								</ImageBackground>
							))}
						</ScrollView>
						{this.renderDots()}
					</View>
					<View style={[styles.flex, styles.content]}>
						<View style={[styles.flex, styles.contentHeader]}>
							<View style={styles.titleBox}>
								<Text style={styles.title}>{marketPlaceName}</Text>
								{isAdmin && (
									<View
										style={{
											display: "flex",
											flexDirection: "row"
										}}>
										<TouchableOpacity
											style={{
												borderColor: theme.colors.red,
												borderWidth: 1,
												borderRadius: 30,
												marginRight: 5
											}}>
											<MaterialIcons
												name="settings"
												onPress={() =>
													this.navigateTo("MarketPlaceSettingsContainer", {
														item: {
															marketPlaceInfo: navigation.getParam("item"),
															admins: marketPlaceAdmins
														}
													})
												}
												style={{ margin: 10 }}
												color={theme.colors.red}
												size={theme.sizes.font * 2}
											/>
										</TouchableOpacity>
										<TouchableOpacity
											style={{
												borderColor: theme.colors.blue,
												borderWidth: 1,
												borderRadius: 30
											}}>
											<MaterialIcons
												name="edit"
												onPress={() =>
													this.navigateTo("MarketPlaceContainer", {
														item: navigation.getParam("item")
													})
												}
												style={{ margin: 10 }}
												color={theme.colors.blue}
												size={theme.sizes.font * 2}
											/>
										</TouchableOpacity>
									</View>
								)}
							</View>
							<View
								style={[
									styles.row,
									{
										alignItems: "center",
										marginVertical: theme.sizes.margin / 2
									}
								]}>
								{this.renderRatings(article.rating)}
								<Text style={{ color: theme.colors.active }}>
									{article.rating}
								</Text>
								<Text style={{ marginLeft: 8, color: theme.colors.caption }}>
									({article.reviews} reviews)
								</Text>
							</View>
							<TouchableOpacity>
								<Text style={styles.description}>
									{description}
									{article.description.split("").slice(0, 180)}...
									<Text style={{ color: theme.colors.active }}> Read more</Text>
								</Text>
							</TouchableOpacity>
						</View>

						<Card
							title="Our menus"
							style={[styles.margin, { marginTop: 18 }]}
							headingRight={this.addServiceDetails(isAdmin || isStaff)}>
							{serviceDetailsLoading &&
							serviceDetailsRequest ===
								serviceDetailsStatus.getServiceDetails ? (
								<ActivityIndicator size="large" color="blue" />
							) : (
								<>
									{marketplaceServiceDetailsData ? (
										marketplaceServiceDetailsData.length > 0 ? (
											marketplaceServiceDetailsData.map(data => (
												<TouchableWithoutFeedback
													key={data._id}
													onPress={() =>
														this.navigateTo("ServiceDetailsInfo", {
															item: data,
															authorized: isStaff
														})
													}>
													<Card row middle style={styles.margin}>
														<Block style={{}}>
															<Image
																key={`${data.uploadedImageArray[0].publicId}`}
																source={{
																	uri: data.uploadedImageArray[0].secureUrl
																}}
																resizeMode="cover"
																style={{ width: 100, height: "100%" }}
															/>
														</Block>
														<Block
															style={{
																flex: 1.5
															}}>
															<Text h4>{data.serviceName}</Text>
															<View
																style={[
																	styles.row,
																	{
																		alignItems: "center",
																		marginVertical: theme.sizes.margin / 2
																	}
																]}>
																{this.renderRatings(article.rating)}
																<Text style={{ color: theme.colors.active }}>
																	{article.rating}
																</Text>
															</View>
															<View
																style={{
																	display: "flex",
																	flexDirection: "row"
																}}>
																<Text
																	style={{
																		color: theme.colors.caption,
																		marginRight: 5
																	}}>
																	{article.reviews} reviews
																</Text>
																<Text
																	style={{
																		color: theme.colors.caption
																	}}>
																	{article.reviews} sales
																</Text>
															</View>
														</Block>
													</Card>
												</TouchableWithoutFeedback>
											))
										) : (
											<Text caption>You are yet to add a service</Text>
										)
									) : (
										<Text caption>You are yet to add a service</Text>
									)}
								</>
							)}
						</Card>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	flex: {
		flex: 1
	},
	column: {
		flexDirection: "column"
	},
	row: {
		flexDirection: "row"
	},
	header: {
		// backgroundColor: 'transparent',
		paddingHorizontal: theme.sizes.padding,
		paddingTop: theme.sizes.padding,
		justifyContent: "space-between",
		alignItems: "center"
	},
	back: {
		width: theme.sizes.base * 3,
		height: theme.sizes.base * 3,
		justifyContent: "center",
		alignItems: "flex-start"
	},
	contentHeader: {
		backgroundColor: "transparent",
		padding: theme.sizes.padding,
		backgroundColor: theme.colors.white,
		borderTopLeftRadius: theme.sizes.border,
		borderTopRightRadius: theme.sizes.border,
		marginTop: -theme.sizes.padding / 2
	},
	avatar: {
		position: "absolute",
		top: -theme.sizes.margin,
		right: theme.sizes.margin,
		width: theme.sizes.padding * 2,
		height: theme.sizes.padding * 2,
		borderRadius: theme.sizes.padding
	},
	shadow: {
		shadowColor: theme.colors.black,
		shadowOffset: {
			width: 0,
			height: 6
		},
		shadowOpacity: 0.5,
		shadowRadius: 5
	},
	dotsContainer: {
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 36,
		right: 0,
		left: 0
	},
	dots: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 6,
		backgroundColor: theme.colors.gray
	},
	titleBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: {
		fontSize: theme.sizes.font * 2,
		fontWeight: "bold"
	},
	description: {
		fontSize: theme.sizes.font * 1.2,
		lineHeight: theme.sizes.font * 2,
		color: theme.colors.caption
	},
	driver: {
		marginBottom: 11
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24
	}
});

export default MarketPlaceDetails;
