import React, { Component } from 'react'
import { StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { theme } from '../../constants';
import { articlesInfo } from '../../constants/mocks';
import { Card, Block, Text } from '../../components';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	column: {
		flexDirection: 'column'
	},
	row: {
		flexDirection: 'row'
	},
	header: {
		// backgroundColor: 'transparent',
		paddingHorizontal: theme.sizes.padding,
		paddingTop: theme.sizes.padding,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	back: {
		width: theme.sizes.base * 3,
		height: theme.sizes.base * 3,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	contentHeader: {
		backgroundColor: 'transparent',
		padding: theme.sizes.padding,
		backgroundColor: theme.colors.white,
		borderTopLeftRadius: theme.sizes.border,
		borderTopRightRadius: theme.sizes.border,
		marginTop: -theme.sizes.padding / 2,
	},
	avatar: {
		position: 'absolute',
		top: -theme.sizes.margin,
		right: theme.sizes.margin,
		width: theme.sizes.padding * 2,
		height: theme.sizes.padding * 2,
		borderRadius: theme.sizes.padding,
	},
	shadow: {
		shadowColor: theme.colors.black,
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
	},
	dotsContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 36,
		right: 0,
		left: 0
	},
	dots: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 6,
		backgroundColor: theme.colors.gray,
	},
	titleBox: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	title: {
		fontSize: theme.sizes.font * 2,
		fontWeight: 'bold'
	},
	description: {
		fontSize: theme.sizes.font * 1.2,
		lineHeight: theme.sizes.font * 2,
		color: theme.colors.caption
	},
	driver: {
		marginBottom: 11,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
	}
});

class CategoryDetails extends Component {
	scrollX = new Animated.Value(0);

	static navigationOptions = ({ navigation }) => {
		return {
			header: (
				<View style={[styles.flex, styles.row, styles.header]}>
					<TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
						<FontAwesome name="chevron-left" color={theme.colors.white} size={theme.sizes.font * 1} />
					</TouchableOpacity>
					<TouchableOpacity>
						<MaterialIcons name="more-horiz" color={theme.colors.white} size={theme.sizes.font * 1.5} />
					</TouchableOpacity>
				</View>
			),
			headerTransparent: true,
		}
	}

	componentDidMount() {
		const item = this.props.navigation.getParam('item');
	}


	renderDots = () => {
		const { navigation } = this.props;
		const { uploadedImageArray } = navigation.getParam('item');
		const dotPosition = Animated.divide(this.scrollX, width);

		return (
			<View style={[styles.flex, styles.row, styles.dotsContainer]}>
				{uploadedImageArray.map((item, index) => {
					const opacity = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [0.5, 1, 0.5],
						extrapolate: 'clamp'
					});
					return (
						<Animated.View
							key={`step-${item}-${index}`}
							style={[styles.dots, { opacity }]}
						/>
					)
				})}
			</View>
		)
	}

	renderRatings = (rating) => {
		const stars = new Array(5).fill(0);
		return (
			stars.map((_, index) => {
				const activeStar = Math.floor(rating) >= (index + 1);
				return (
					<FontAwesome
						name="star"
						key={`star-${index}`}
						size={theme.sizes.font}
						color={theme.colors[activeStar ? 'active' : 'gray']}
						style={{ marginRight: 4 }} />
				)
			})
		)
	}

  navigateToBrowse = (to, params) => {
    this.props.navigation.navigate(to, params)
  }

	render() {
		const {
			navigation,
			userdata } = this.props;
		const {
			uploadedImageArray,
			marketPlaceName,
			owner,
			description } = navigation.getParam('item');
		const article = articlesInfo[0]

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
							onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}>
							{
								uploadedImageArray.map((img, index) =>
									<Image
										key={`${index}-${img.publicId}`}
										source={{ uri: img.secureUrl }}
										resizeMode='cover'
										style={{ width, height: width }} />
								)
							}
						</ScrollView>
						{this.renderDots()}
					</View>
					<View style={[styles.flex, styles.content]}>
						<View style={[styles.flex, styles.contentHeader]}>
							<View style={styles.titleBox}>
								<Text style={styles.title}>{marketPlaceName}</Text>
								<View
									style={{
										borderColor: theme.colors.blue,
										borderWidth: 1,
										borderRadius: 30
									}}>
									{owner === userdata._id && (
										<MaterialIcons
											name="edit"
											onPress={() => this.navigateToBrowse('MarketPlaceContainer',  { item: navigation.getParam('item')})}
											style={{ margin: 10 }}
											color={theme.colors.blue}
											size={theme.sizes.font * 2} />
											)}
								</View>
							</View>
							<View style={[
								styles.row,
								{ alignItems: 'center', marginVertical: theme.sizes.margin / 2 }
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
									{article.description.split('').slice(0, 180)}...
                  <Text style={{ color: theme.colors.active }}> Read more</Text>
								</Text>
							</TouchableOpacity>
						</View>

						<Card
							title="Our menus"
							style={[styles.margin, { marginTop: 18 }]}
						>
							<Card row middle style={styles.margin}>
								<Block flex={1.2} center middle style={{ marginRight: 20 }}>
									<Text light height={43} size={36} spacing={-0.45}>86</Text>
									<Text ligth caption center style={{ paddingHorizontal: 16, marginTop: 3 }}>
										OPERATING SCORE
                            </Text>
								</Block>
								<Block>
									<Text paragraph color="black3">
										All cars are operating well.
										There were 1,233 trips since your last login.
                            </Text>
								</Block>
							</Card>
							<Card row middle style={styles.margin}>
								<Block flex={1.2} center middle style={{ marginRight: 20 }}>
									<Text light height={43} size={36} spacing={-0.45}>86</Text>
									<Text ligth caption center style={{ paddingHorizontal: 16, marginTop: 3 }}>
										OPERATING SCORE
                            </Text>
								</Block>
								<Block>
									<Text paragraph color="black3">
										All cars are operating well.
										There were 1,233 trips since your last login.
                            </Text>
								</Block>
							</Card>
							<Card row middle style={styles.margin}>
								<Block flex={1.2} center middle style={{ marginRight: 20 }}>
									<Text light height={43} size={36} spacing={-0.45}>86</Text>
									<Text ligth caption center style={{ paddingHorizontal: 16, marginTop: 3 }}>
										OPERATING SCORE
                            </Text>
								</Block>
								<Block>
									<Text paragraph color="black3">
										All cars are operating well.
										There were 1,233 trips since your last login.
                            </Text>
								</Block>
							</Card>
							<Card row middle style={styles.margin}>
								<Block flex={1.2} center middle style={{ marginRight: 20 }}>
									<Text light height={43} size={36} spacing={-0.45}>86</Text>
									<Text ligth caption center style={{ paddingHorizontal: 16, marginTop: 3 }}>
										OPERATING SCORE
                            </Text>
								</Block>
								<Block>
									<Text paragraph color="black3">
										All cars are operating well.
										There were 1,233 trips since your last login.
                            </Text>
								</Block>
							</Card>
							<Card row middle style={styles.margin}>
								<Block flex={1.2} center middle style={{ marginRight: 20 }}>
									<Text light height={43} size={36} spacing={-0.45}>86</Text>
									<Text ligth caption center style={{ paddingHorizontal: 16, marginTop: 3 }}>
										OPERATING SCORE
                            </Text>
								</Block>
								<Block>
									<Text paragraph color="black3">
										All cars are operating well.
										There were 1,233 trips since your last login.
                            </Text>
								</Block>
							</Card>
							<Card row middle style={styles.margin}>
								<Block flex={1.2} center middle style={{ marginRight: 20 }}>
									<Text light height={43} size={36} spacing={-0.45}>86</Text>
									<Text ligth caption center style={{ paddingHorizontal: 16, marginTop: 3 }}>
										OPERATING SCORE
                            </Text>
								</Block>
								<Block>
									<Text paragraph color="black3">
										All cars are operating well.
										There were 1,233 trips since your last login.
                            </Text>
								</Block>
							</Card>
						</Card>
					</View>
				</View>
			</ScrollView>
		)
	}
}

export default CategoryDetails;