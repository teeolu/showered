import React, { Component } from "react";
import {
	TouchableOpacity,
	ImageBackground,
	ScrollView,
	Image,
	Animated,
	Dimensions,
	Platform,
	StyleSheet,
	FlatList,
	View
} from "react-native";

import { Text } from "../../components";
import * as theme from "../../constants/theme";
import {
	Feather,
	MaterialIcons,
	EvilIcons,
	FontAwesome,
	Entypo,
	AntDesign
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

class ServiceDetails extends Component {
	static navigationOptions = {
		header: null
	};

	scrollX = new Animated.Value(0);

	renderDots() {
		const dotPosition = Animated.divide(this.scrollX, width);
		return (
			<View
				style={[
					styles.flex,
					styles.row,
					{
						justifyContent: "center",
						position: "absolute",
						alignItems: "center",
						bottom: 10,
						left: width / 2
					}
				]}>
				{this.props.currentServiceDetails.uploadedImageArray.map(
					(item, index) => {
						const borderWidth = dotPosition.interpolate({
							inputRange: [index - 1, index, index + 1],
							outputRange: [0, 2.5, 0],
							extrapolate: "clamp"
						});
						return (
							<Animated.View
								key={`step-${index}`}
								style={[
									styles.dots,
									styles.activeDot,
									{ borderWidth: borderWidth }
								]}
							/>
						);
					}
				)}
			</View>
		);
	}

	renderDestination = item => {
		const { navigation } = this.props;
		return (
			<TouchableOpacity activeOpacity={1}>
				<ImageBackground
					style={[styles.flex, styles.destination, styles.shadow]}
					source={{ uri: item.secureUrl }}></ImageBackground>
			</TouchableOpacity>
		);
	};

	renderAddToFavorite = () => {
		return (
			<TouchableOpacity
				activeOpacity={0.5}
				style={[
					styles.flex,
					styles.row,
					styles.shadow,
					{
						justifyContent: "center",
						position: "absolute",
						alignItems: "center",
						top: 0,
						right: 0,
						height: 60,
						width: 60,
						borderRadius: 30,
						backgroundColor: "#fff",
						zIndex: 5,
						transform: [{ translateX: -20 }, { translateY: -30 }]
					}
				]}>
				<MaterialIcons
					name="favorite-border"
					size={theme.sizes.font * 2}
					color={theme.colors.red}
				/>
			</TouchableOpacity>
		);
	};

	renderBackarrowContainer = () => {
		return (
			<View
				style={[
					styles.flex,
					styles.row,
					{
						position: "absolute",
						justifyContent: "space-between",
						alignItems: "center",
						top: 0,
						left: 0,
						height: 150,
						paddingHorizontal: theme.sizes.padding,
						width
					}
				]}>
				<TouchableOpacity onPress={() => this.props.navigation.pop()}>
					<Feather
						name="x"
						size={theme.sizes.font * 2}
						color={theme.colors.white}
						style={{}}
					/>
				</TouchableOpacity>
				<View
					style={[
						styles.flex,
						styles.row,
						{
							alignItems: "center",
							marginLeft: 190,
							justifyContent: "flex-end"
						}
					]}>
					<TouchableOpacity>
						<EvilIcons
							name="share-google"
							size={theme.sizes.font * 3}
							color={theme.colors.white}
							style={{
								marginRight: 10
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Entypo
							name="dots-three-vertical"
							size={theme.sizes.font * 2}
							color={theme.colors.white}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	renderHeading = () => {
		return (
			<View
				style={[styles.column, styles.destinations, { position: "relative" }]}>
				<FlatList
					horizontal
					pagingEnabled
					scrollEnabled
					showsHorizontalScrollIndicator={false}
					decelerationRate={0}
					scrollEventThrottle={16}
					snapToAlignment="center"
					style={{ overflow: "visible" }}
					data={this.props.currentServiceDetails.uploadedImageArray}
					keyExtractor={(item, index) => `${index}`}
					onScroll={Animated.event([
						{ nativeEvent: { contentOffset: { x: this.scrollX } } }
					])}
					renderItem={({ item }) => this.renderDestination(item)}
				/>
				{this.renderDots()}
				{this.renderBackarrowContainer()}
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

	renderOurExtrabenefit = () => {
		return (
			<View
				style={{
					padding: theme.sizes.padding,
					backgroundColor: theme.colors.gray3
				}}>
				<Text
					h4
					style={{
						paddingVertical: theme.sizes.padding / 2,
						paddingLeft: theme.sizes.padding / 2
					}}>
					Extra services
				</Text>
				{[
					"Delivery available",
					"Free seat reservation when you order for four"
				].map(el => (
					<View
						key={el}
						style={{
							...styles.center,
							paddingHorizontal: theme.sizes.padding / 2
						}}>
						<AntDesign
							name="minus"
							size={theme.sizes.font * 2}
							color={theme.colors.caption}
						/>
						<Text
							style={{
								color: theme.colors.black3
							}}>
							{el}
						</Text>
					</View>
				))}
			</View>
		);
	};

	renderReviews = () => {
		return (
			<View
				style={{
					padding: theme.sizes.padding,
					backgroundColor: theme.colors.gray3
				}}>
				<Text
					h4
					style={{
						paddingVertical: theme.sizes.padding / 2,
						paddingLeft: theme.sizes.padding / 2
					}}>
					reviews
				</Text>
				{["Delivery available"].map(el => (
					<View
						key={el}
						style={{
							...styles.center,
							alignItems: "flex-start",
							paddingHorizontal: theme.sizes.padding / 2
						}}>
						<ImageBackground
							style={{
								height: 50,
								width: 50,
								marginRight: 10
							}}
							imageStyle={{ borderRadius: 25 }}
							source={{
								uri: this.props.currentServiceDetails.uploadedImageArray[0]
									.secureUrl
							}}
						/>
						<View>
							<View
								style={{
									...styles.center,
									justifyItem: "space-between",
									paddingRight: theme.sizes.padding * 2.5,
									paddingBottom: theme.sizes.padding / 2
								}}>
								<Text
									h4
									style={{
										color: theme.colors.black,
										fontSize: theme.sizes.font
									}}>
									Adewuyi sam
								</Text>
								<View
									style={{
										justifySelf: "flex-end"
									}}>
									<Text
										caption
										style={{
											fontSize: theme.sizes.font * 0.8
										}}>
										22mins ago
									</Text>
								</View>
							</View>
							<View style={{ ...styles.center }}>
								{this.renderRatings(4)}
								<Text caption> (34 Votes)</Text>
							</View>
						</View>
					</View>
				))}
			</View>
		);
	};

	render() {
		const { navigation, currentServiceDetails } = this.props,
			{
				marketPlaceId,
				serviceName,
				uploadedImageArray
			} = currentServiceDetails,
			authorised = navigation.getParam("authorized", false);

		return (
			<ScrollView style={styles.overview}>
				<ScrollView>{this.renderHeading()}</ScrollView>
				<View
					style={{
						padding: theme.sizes.padding,
						position: "relative",
						backgroundColor: theme.colors.gray3
					}}>
					{this.renderAddToFavorite()}
					<View
						style={{
							padding: theme.sizes.padding / 2,
							marginVertical: 10,
							borderBottomColor: theme.colors.black3,
							borderBottomWidth: 2
						}}>
						<Text h2>Mt. Catlin Hotel</Text>
						<View style={styles.center}>
							<Text
								style={{
									color: theme.colors.black,
									fontSize: theme.sizes.font * 1.2
								}}>
								$897
							</Text>
							<Entypo
								name="dot-single"
								color={theme.colors.black3}
								size={theme.sizes.font * 2}
							/>
							<Text
								style={{
									color: theme.colors.black,
									fontSize: theme.sizes.font * 1.2
								}}>
								New York
							</Text>
						</View>
					</View>
					<View
						style={{ padding: theme.sizes.padding / 2, marginVertical: 10 }}>
						<Text h4>About Mt. Catlin</Text>
						<Text
							style={{
								fontSize: theme.sizes.font,
								lineHeight: theme.sizes.font * 2,
								color: theme.colors.caption
							}}
							bold>
							padding: theme. sizes. padding / 2, border Bottom Color: theme.
							colors. black3, border Bottom Width: 2, padding:
							theme.sizes.padding / 2,
						</Text>
					</View>
				</View>
				<View
					style={{
						paddingHorizontal: theme.sizes.padding,
						paddingVertical: theme.sizes.padding * (2 / 3),
						backgroundColor: "#fdfdfd"
					}}>
					<View style={{ ...styles.center, padding: theme.sizes.padding / 2 }}>
						<View
							style={{
								...styles.center,
								paddingRight: 20,
								borderRightColor: theme.colors.caption,
								borderRightWidth: 2
							}}>
							<Feather
								name="sun"
								color={theme.colors.gray}
								size={theme.sizes.font * 2.5}
							/>
							<View
								style={{
									marginLeft: 10
								}}>
								<Text
									style={{
										fontSize: 18
									}}
									h3>
									22&deg;
								</Text>
								<Text
									style={{
										fontSize: theme.sizes.font,
										color: theme.colors.black3
									}}>
									sunny
								</Text>
							</View>
						</View>
						<View
							style={{
								...styles.center,
								paddingLeft: 20
							}}>
							<View
								style={{
									marginLeft: 10
								}}>
								<View
									style={{
										...styles.center
									}}>
									<Text
										style={{
											fontSize: 18
										}}
										h3>
										8.4{" "}
									</Text>
									<Text
										light
										style={{
											fontSize: theme.sizes.font,
											color: theme.colors.black3
										}}>
										+6k reviews
									</Text>
								</View>
								<View
									style={{
										...styles.center
									}}>
									{this.renderRatings(4)}
								</View>
							</View>
							<View
								style={{
									...styles.center,
									paddingLeft: 10
								}}>
								<View
									style={{
										height: 40,
										width: 40,
										borderRadius: 20,
										borderWidth: 3,
										borderColor: "#fff",
										padding: 2,
										backgroundColor: theme.colors.caption
									}}></View>
								<View
									style={{
										height: 40,
										width: 40,
										borderRadius: 20,
										borderWidth: 3,
										borderColor: "#fff",
										padding: 2,
										backgroundColor: theme.colors.caption,
										transform: [{ translateX: -10 }]
									}}></View>
								<View
									style={{
										height: 40,
										width: 40,
										borderRadius: 20,
										borderWidth: 3,
										borderColor: "#fff",
										padding: 2,
										backgroundColor: theme.colors.caption,
										transform: [{ translateX: -20 }]
									}}></View>
							</View>
						</View>
					</View>
				</View>
				<View style={{ height: 7, backgroundColor: "#f2f2f2" }}></View>
				{this.renderOurExtrabenefit()}
				<View style={{ height: 7, backgroundColor: "#f2f2f2" }}></View>
				{this.renderReviews()}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	overview: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: theme.colors.white
	},
	flex: {
		flex: 1
	},
	rating: {
		fontSize: theme.sizes.font * 2,
		color: theme.colors.white,
		fontWeight: "bold"
	},
	dots: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 6,
		backgroundColor: theme.colors.black2
	},
	relative: { position: "absolute" },
	activeDot: {
		borderColor: theme.colors.white
	},
	destinations: {
		height: height * 0.5
	},
	driver: {
		marginBottom: 11
	},
	column: {
		flexDirection: "column"
	},
	shadow: {
		shadowColor: theme.colors.black,
		shadowRadius: 10,
		shadowOffset: { width: 15, height: 2 },
		shadowOpacity: 0.1,
		elevation: Platform.OS === "android" ? 50 : 0
	},
	row: {
		flexDirection: "row"
	},
	destination: {
		width: width,
		height: width,
		paddingHorizontal: theme.sizes.padding,
		paddingVertical: theme.sizes.padding * 0.66
	},
	center: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	}
});

export default ServiceDetails;
