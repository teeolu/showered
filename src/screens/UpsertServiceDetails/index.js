import React, { Component } from "react";
import {
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	Dimensions,
	View,
	StyleSheet
} from "react-native";

import { Block, Text, Icon, Card, Button } from "../../components";
import * as theme from "../../constants/theme";
import ServiceDetailsInfo from "./ServiceDetailsInfo";
import ServiceDetailsPrice from "./ServiceDetailsPrice";
import UploadServiceDetailsImage from "./ServiceDetailsImage";
import { validateInput } from "../../utils/inputFunctions";
import { marketplaceStatus } from "../../modules/marketPlace/reducers";
import { serviceDetailsStatus } from "../../modules/MarketplaceServiceDetails/reducers";
const { width } = Dimensions.get("window");

class UpsertServiceDetails extends Component {
	constructor(props, context) {
		super(props);
		this.scrollView;
		const item = this.props.navigation.getParam("item", {});
		const edit = Object.keys(item).length > 0;
		const {
			delivery,
			description,
			price,
			serviceName,
			tags,
			uploadedImageArray
		} = item;
		this.state = {
			currentIndex: 0,
			formError: false,
			edit,
			errorMessage: "",
			fields: {
				serviceName: {
					value: edit ? serviceName : "",
					error: edit ? false : true,
					errorMessage: "",
					rules: {
						maxLength: 100,
						minLength: 3
					}
				},
				description: {
					value: edit ? description : "",
					error: edit ? false : true,
					errorMessage: "",
					rules: {
						minLength: 3
					}
				},
				tags: {
					value: edit ? tags[-1] : "",
					tagsArray: edit ? tags : [],
					error: false,
					errorMessage: "",
					rules: {}
				},
				price: {
					value: edit ? price.toString() : "",
					error: edit ? false : true,
					errorMessage: "",
					rules: {
						price: true
					}
				},
				delivery: {
					value: edit ? edit : false,
					error: false,
					errorMessage: "",
					rules: {}
				},
				uploadedImageArray: {
					error: edit ? false : true,
					errorMessage: "",
					value: edit ? uploadedImageArray : [],
					rules: {
						maxLength: 5,
						minLength: 1
					}
				}
			}
		};
	}

	onScroll = event => {
		const { contentOffset } = event.nativeEvent;
		const currentIndex = Math.round(contentOffset.x / width);
		if (this.state.currentIndex !== currentIndex) {
			this.setState({ currentIndex });
		}
	};

	handleChange = (type, yesNo) => text => {
		let newState = { ...this.state };
		if (type === "delivery") {
			newState.fields[type].value = yesNo;
			return this.setState(prevState => ({
				...prevState,
				...newState,
				formError: false,
				errorMessage: ""
			}));
		}

		if (type === "tags") {
			var newText = text.split(",");
			newText.length >= 2
				? (newState.fields[type] = {
						...newState.fields[type],
						value: newText[newText.length - 1],
						tagsArray: [
							...newState.fields[type].tagsArray,
							...newText.slice(0, -1)
						],
						error: false,
						errorMessage: ""
				  })
				: (newState.fields[type] = {
						...newState.fields[type],
						value: newText[newText.length - 1],
						tagsArray: [...newState.fields[type].tagsArray],
						error: false,
						errorMessage: ""
				  });

			return this.setState(prevState => ({
				...prevState,
				...newState,
				formError: false,
				errorMessage: ""
			}));
		}
		newState.fields[type] = {
			...newState.fields[type],
			value: text,
			error: false,
			errorMessage: ""
		};

		this.setState(prevState => ({
			...prevState,
			...newState,
			formError: false,
			errorMessage: ""
		}));
	};

	blurReact = ({ error, errorMessage, type }) => {
		let newState = { ...this.state };
		newState.fields[type] = { ...newState.fields[type], error, errorMessage };

		this.setState(prevState => ({
			...prevState,
			...newState
		}));
	};

	handleSubmit = event => {
		const {
			requestAddMarketplaceServiceDetailsAction,
			requestEditMarketplaceServiceDetailsAction,
			navigation
		} = this.props;
		let item = navigation.getParam("item", {});
		const { _id, category } = this.props.currentMarketplace;

		var { error, errorMessage } = validateInput(this.state.fields);
		if (error) {
			return this.setState({
				formError: true,
				errorMessage: errorMessage
			});
		}

		let dataToSubmit = {};
		Object.keys(this.state.fields).map(el => {
			dataToSubmit[el] = this.state.fields[el].value;
		});

		if (this.state.edit) {
			return requestEditMarketplaceServiceDetailsAction({
				dataToSubmit: {
					...item,
					...dataToSubmit,
					tags: this.state.fields.tags.tagsArray,
					category
				},
				_id: item._id,
				navigation,
				navigateTo: "ServiceDetailsInfo"
			});
		}

		requestAddMarketplaceServiceDetailsAction({
			dataToSubmit: {
				...dataToSubmit,
				tags: this.state.fields.tags.tagsArray,
				category,
				marketPlaceId: _id
			},
			navigation,
			navigateTo: "ServiceDetailsInfo"
		});
	};

	nextForm = () => {
		const { currentIndex } = this.state;
		if (currentIndex === 2) this.handleSubmit();
		const newIndex = currentIndex <= 1 ? currentIndex + 1 : currentIndex;

		this.scrollView.scrollTo({
			x: newIndex * width,
			animated: true
		});

		this.setState(prevState => ({
			currentIndex: prevState.currentIndex <= 2 ? newIndex : 3
		}));
	};

	prevForm = () => {
		const newIndex = this.state.currentIndex - 1;

		this.scrollView.scrollTo({
			x: newIndex * width,
			animated: true
		});

		this.setState(prevState => ({
			currentIndex: prevState.currentIndex >= 0 ? newIndex : 0
		}));
	};

	removeTag = (index, tag) => {
		if (this.state.fields.tags.tagsArray[index] === tag) {
			let newState = { ...this.state };
			newState.fields.tags.tagsArray.splice(index, 1);
			this.setState({
				...newState
			});
		}
	};

	render() {
		const {
			requestImageUploadAction,
			requestRemoveImageUploadAction,
			imageUploadLoading,
			deletedPublicId,
			imageUploadUrl,
			addServiceDetailsLoading,
			addServiceDetailsRequest,
			imageUploadError,
			imageUploadRequest
		} = this.props;

		return (
			<SafeAreaView style={styles.overview}>
				<ScrollView>
					<Card row middle style={styles.margin}>
						<Block flex={1.2} center middle style={{ marginRight: 20 }}>
							<Text light height={43} size={36} spacing={-0.45}>
								86
							</Text>
							<Text
								ligth
								caption
								center
								style={{ paddingHorizontal: 16, marginTop: 3 }}>
								OPERATING SCORE
							</Text>
						</Block>
						<Block>
							<Text paragraph color="black3">
								All cars are operating well. There were 1,233 trips since your
								last login.
							</Text>
						</Block>
					</Card>
					<ScrollView
						horizontal
						pagingEnabled
						scrollEnabled
						ref={ref => (this.scrollView = ref)}
						showsHorizontalScrollIndicator={false}
						decelerationRate={0}
						scrollEventThrottle={16}
						snapToAlignment="center"
						onScroll={this.onScroll}
						style={{ flex: 1 }}>
						<ServiceDetailsInfo
							styles={styles}
							handleChange={this.handleChange}
							inputInfo={this.state.fields}
							blur={arg => this.blurReact(arg)}
						/>
						<ServiceDetailsPrice
							styles={styles}
							handleChange={this.handleChange}
							inputInfo={this.state.fields}
							removeTag={this.removeTag}
							blur={arg => this.blurReact(arg)}
						/>
						<UploadServiceDetailsImage
							requestImageUploadAction={requestImageUploadAction}
							requestRemoveImageUploadAction={requestRemoveImageUploadAction}
							handleChange={this.handleChange}
							imageUploadRequest={imageUploadRequest}
							imageUploadLoading={imageUploadLoading}
							imageUploadUrl={imageUploadUrl}
							deletedPublicId={deletedPublicId}
							formError={this.state.formError}
							imageUploadError={imageUploadError}
							inputInfo={this.state.fields}
							blur={arg => this.blurReact(arg)}
						/>
					</ScrollView>
				</ScrollView>
				<View style={{ backgroundColor: theme.colors.white }}>
					{this.state.formError && (
						<View>
							<Text style={{ textAlign: "center", color: "red" }}>
								{this.state.errorMessage}
							</Text>
						</View>
					)}
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							padding: theme.sizes.base
						}}>
						<Button
							onPress={this.prevForm}
							style={{
								backgroundColor: theme.colors.shadow,
								width: "40%",
								marginRight: theme.sizes.base
							}}>
							<Text>Prev</Text>
						</Button>
						<Button
							style={{ width: "40%" }}
							onPress={this.nextForm}
							isLoading={
								addServiceDetailsRequest ===
									serviceDetailsStatus.addServiceDetails &&
								addServiceDetailsLoading
							}>
							<Text>{this.state.currentIndex == 2 ? "Submit" : "Next"}</Text>
						</Button>
					</View>
				</View>
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
	card: {
		padding: 20,
		borderRadius: theme.sizes.radius,
		backgroundColor: theme.colors.white,
		shadowColor: theme.colors.shadow,
		shadowOpacity: 1,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 0 },
		elevation: 2,
		marginBottom: theme.sizes.base,
		minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
		maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
		maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
	},
	active: {
		borderColor: theme.colors.blue,
		shadowOffset: { width: 0, height: 0 },
		shadowColor: theme.colors.lightblue,
		shadowRadius: 3,
		shadowOpacity: 1
	},
	icon: {
		flex: 0,
		height: 48,
		width: 48,
		borderRadius: 48,
		marginBottom: 15,
		backgroundColor: theme.colors.lightblue
	},
	check: {
		position: "absolute",
		right: 9,
		top: 9
	}
});

export default UpsertServiceDetails;
