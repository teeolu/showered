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
import { NavigationActions } from "react-navigation";

import { Block, Card, Text, Label, Box } from "../../components";
import * as theme from "../../constants/theme";
import { articlesInfo } from "../../constants/mocks";
import { categoryNames } from "../UpsertMarketPlace/SelectCategory";
const { width } = Dimensions.get("window");

class Overview extends Component {
	constructor(props) {
		super(props);

		this.navigateToBrowse = this.navigateToBrowse.bind(this);
	}

	componentDidMount() {}

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
						left: width / 2,
						transform: [{ translateX: -50 }]
					}
				]}>
				{articlesInfo.map((item, index) => {
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
				})}
			</View>
		);
	}

	renderDestination = item => {
		const { navigation } = this.props;
		return (
			<TouchableOpacity activeOpacity={0.8}>
				<ImageBackground
					style={[styles.flex, styles.destination, styles.shadow]}
					source={{ uri: item.preview }}></ImageBackground>
			</TouchableOpacity>
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
					data={articlesInfo}
					keyExtractor={(item, index) => `${index}`}
					onScroll={Animated.event([
						{ nativeEvent: { contentOffset: { x: this.scrollX } } }
					])}
					renderItem={({ item }) => this.renderDestination(item)}
				/>
				{this.renderDots()}
			</View>
		);
	};

	navigateToBrowse = () => {
		this.props.navigation.navigate("Browse");
	};

	render() {
		return (
			<SafeAreaView style={styles.overview}>
				<ScrollView contentContainerStyle={{ paddingVertical: 0 }}>
					{this.renderHeading()}

					<Card style={{ marginTop: 18 }}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								flexWrap: "wrap"
							}}>
							{categoryNames.map(name => (
								<Box
									key={name.name}
									onPress={this.navigateToBrowse}
									name={name.name}
								/>
							))}
						</View>
					</Card>

					<Card
						title="TODAY'S TRIPS"
						style={[styles.margin, { marginTop: 18 }]}>
						<Block row right>
							<Block flex={2} row center right>
								<Label blue />
								<Text paragraph color="gray">
									Today
								</Text>
							</Block>
							<Block row center right>
								<Label purple />
								<Text paragraph color="gray">
									Yesterday
								</Text>
							</Block>
						</Block>
						<Block>
							<Text>Chart</Text>
						</Block>
					</Card>

					<Card title="TOP DRIVERS" style={[styles.margin, { marginTop: 18 }]}>
						<Block style={styles.driver}>
							<TouchableOpacity activeOpacity={0.8}>
								<Block row center>
									<Block>
										<Image
											style={styles.avatar}
											source={{
												uri:
													"https://images.unsplash.com/photo-1506244856291-8910ea843e81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
											}}
										/>
									</Block>
									<Block flex={2}>
										<Text h4>Grand Tesoro</Text>
										<Text paragraph color="gray">
											Chevrolet Bolt
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
						<Block style={styles.driver}>
							<TouchableOpacity activeOpacity={0.8}>
								<Block row center>
									<Block>
										<Image
											style={styles.avatar}
											source={{
												uri:
													"https://images.unsplash.com/photo-1521657249896-063c0c611fe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
											}}
										/>
									</Block>
									<Block flex={2}>
										<Text h4>Invision App</Text>
										<Text paragraph color="gray">
											Tesla Model X
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
						<Block style={styles.driver}>
							<TouchableOpacity activeOpacity={0.8}>
								<Block row center>
									<Block>
										<Image
											style={styles.avatar}
											source={{
												uri:
													"https://images.unsplash.com/photo-1536700503339-1e4b06520771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
											}}
										/>
									</Block>
									<Block flex={2}>
										<Text h4>React UI Kit</Text>
										<Text paragraph color="gray">
											Volvo Intellisafe
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
					</Card>

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
										Confort
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
				</ScrollView>
			</SafeAreaView>
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
		borderWidth: 2.5,
		borderRadius: 5,
		marginHorizontal: 6,
		backgroundColor: theme.colors.gray,
		borderColor: "transparent"
	},
	relative: { position: "absolute" },
	activeDot: {
		width: 12.5,
		height: 12.5,
		borderRadius: 6.25,
		borderColor: theme.colors.active
	},
	destinations: {
		flex: 1,
		justifyContent: "space-between"
	},
	driver: {
		marginBottom: 11
	},
	column: {
		flexDirection: "column"
	},
	shadow: {
		shadowColor: theme.colors.black,
		shadowOffset: {
			width: 0,
			height: 6
		},
		shadowOpacity: 0.05,
		shadowRadius: 10
	},
	row: {
		flexDirection: "row"
	},
	destination: {
		width: width,
		height: width,
		paddingHorizontal: theme.sizes.padding,
		paddingVertical: theme.sizes.padding * 0.66
	}
});

export default Overview;
