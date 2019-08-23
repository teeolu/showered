import React, { Component } from "react";
import {
	TouchableOpacity,
	Image,
	SafeAreaView,
	ImageBackground,
	ScrollView,
	Dimensions,
	StyleSheet,
	Animated,
	View,
	FlatList
} from "react-native";
import {
	Octicons,
	MaterialIcons,
	Ionicons,
	FontAwesome
} from "react-native-vector-icons";

import { Block, Card, Text, Icon, Label, Box } from "../../components";
import * as theme from "../../constants/theme";
const { width } = Dimensions.get("window");

class ServiceDetails extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);

		this.navigateToBrowse = this.navigateToBrowse.bind(this);
	}

	navigateToBrowse = () => {
		this.props.navigation.navigate("Browse");
	};

	render() {
		const { navigation } = this.props,
			{
				delivery,
				description,
				marketPlaceId,
				isStaff,
				price,
				serviceName,
				uploadedImageArray
			} = navigation.getParam("item", {}),
			authorised = navigation.getParam("authorized", false);
		return (
			<SafeAreaView style={styles.overview}>
				<ImageBackground
					source={{ uri: uploadedImageArray[0].secureUrl }}
					style={styles.backgroundImage}>
					<View style={styles.overlay} />
					<ScrollView contentContainerStyle={{ display: "flex" }}>
						<View
							style={{ alignItems: "center", marginHorizontal: 30, flex: 1 }}>
							<View
								style={{
									display: "flex",
									width: "100%",
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									paddingVertical: 10
								}}>
								<TouchableOpacity
									style={styles.back}
									onPress={() => navigation.goBack()}>
									<Ionicons
										name="ios-arrow-round-back"
										color={theme.colors.white}
										size={theme.sizes.font * 4}
									/>
								</TouchableOpacity>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center"
									}}>
									<TouchableOpacity>
										<MaterialIcons
											name="favorite-border"
											onPress={() => null}
											style={{ margin: 10 }}
											color={theme.colors.red}
											size={theme.sizes.font * 4}
										/>
									</TouchableOpacity>
									{authorised && (
										<TouchableOpacity
											style={{
												borderColor: theme.colors.blue,
												borderWidth: 1,
												borderRadius: 30
											}}>
											<MaterialIcons
												name="edit"
												onPress={() =>
													navigation.navigate("ServiceDetails", {
														item: navigation.getParam("item"),
														marketPlaceId
													})
												}
												style={{ margin: 10 }}
												color={theme.colors.blue}
												size={theme.sizes.font * 2}
											/>
										</TouchableOpacity>
									)}
								</View>
							</View>
							<Image
								style={styles.productImg}
								source={{
									uri:
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3v7KDJN7TAoJa5sFaPWcp1HX8JFcpF3z5K3ngz4L6kWoEP7Ca"
								}}
							/>
							<Text style={styles.name}>{serviceName}</Text>
							<Text style={styles.price}>$ 12.22</Text>
							<Text style={styles.description}>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
								commodo ligula eget dolor. Aenean massa. Cum sociis natoque
								penatibus et magnis dis parturient montes, nascetur ridiculus
								mus. Donec quam felis, ultricies nec
							</Text>
						</View>
						<View style={styles.starContainer}>
							<Image
								style={styles.star}
								source={{
									uri: "https://img.icons8.com/color/40/000000/star.png"
								}}
							/>
							<Image
								style={styles.star}
								source={{
									uri: "https://img.icons8.com/color/40/000000/star.png"
								}}
							/>
							<Image
								style={styles.star}
								source={{
									uri: "https://img.icons8.com/color/40/000000/star.png"
								}}
							/>
							<Image
								style={styles.star}
								source={{
									uri: "https://img.icons8.com/color/40/000000/star.png"
								}}
							/>
							<Image
								style={styles.star}
								source={{
									uri: "https://img.icons8.com/color/40/000000/star.png"
								}}
							/>
						</View>
						<View style={styles.separator} />
						<View style={styles.addToCarContainer}>
							<TouchableOpacity
								style={styles.shareButton}
								onPress={() => this.clickEventListener()}>
								<Text style={styles.shareButtonText}>Add To Cart</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</ImageBackground>
			</SafeAreaView>
		);
	}
}
const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.7)"
	},
	backgroundImage: {
		flex: 1,
		resizeMode: "cover" // or 'stretch'
	},
	overview: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: theme.colors.white
	},
	flex: {
		flex: 1
	},
	margin: {
		marginHorizontal: 25
	},
	driver: {
		marginBottom: 11
	},
	column: {
		flexDirection: "column"
	},
	row: {
		flexDirection: "row"
	},
	productImg: {
		width: 200,
		height: 200
	},
	name: {
		fontSize: 28,
		color: "#696969",
		fontWeight: "bold"
	},
	price: {
		marginTop: 10,
		fontSize: 18,
		color: "green",
		fontWeight: "bold"
	},
	description: {
		textAlign: "center",
		marginTop: 10,
		color: "#696969"
	},
	star: {
		width: 40,
		height: 40
	},
	btnColor: {
		height: 30,
		width: 30,
		borderRadius: 30,
		marginHorizontal: 3
	},
	btnSize: {
		height: 40,
		width: 40,
		borderRadius: 40,
		borderColor: "#778899",
		borderWidth: 1,
		marginHorizontal: 3,
		backgroundColor: "white",

		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	starContainer: {
		justifyContent: "center",
		marginHorizontal: 30,
		flexDirection: "row",
		marginTop: 20
	},
	contentColors: {
		justifyContent: "center",
		marginHorizontal: 30,
		flexDirection: "row",
		marginTop: 20
	},
	contentSize: {
		justifyContent: "center",
		marginHorizontal: 30,
		flexDirection: "row",
		marginTop: 20
	},
	separator: {
		height: 2,
		backgroundColor: "#eeeeee",
		marginTop: 20,
		marginHorizontal: 30
	},
	shareButton: {
		marginTop: 10,
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
		backgroundColor: "#00BFFF"
	},
	shareButtonText: {
		color: "#FFFFFF",
		fontSize: 20
	},
	addToCarContainer: {
		marginHorizontal: 30
	}
});

export default ServiceDetails;
