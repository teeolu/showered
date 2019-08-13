import React, { PureComponent } from 'react';
import {
	Dimensions,
	View,
	TouchableOpacity,
	Platform,
	ImageBackground,
	ActivityIndicator,
	Alert,
	Linking
} from 'react-native';
import { Entypo, MaterialIcons } from 'react-native-vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { Card, Block, Text } from '../../components';
import { theme } from '../../constants';
import { imageUploadStatus } from '../../modules/imageUpload/reducers';
const { width } = Dimensions.get('window');

export class UploadMarketPlaceImage extends PureComponent {
	state = {
		image: null,
		errorAlert: false,
		errorMessage: "",
		dataToDelete: {},
		deletePulicId: ''
	};

	componentDidUpdate(prevProps, prevState) {
		const { imageUploadUrl, deletedPublicId, inputInfo } = this.props;

		const setNewArray = () => {
			const newUploadedImageArray = [...inputInfo.uploadedImageArray.value];

			const index = newUploadedImageArray.findIndex(el => el.secureUrl === imageUploadUrl.secureUrl);
			if (index === -1) {
				newUploadedImageArray.push(this.props.imageUploadUrl);
			};
			this.props.handleChange('uploadedImageArray')(newUploadedImageArray);
		}

		if (prevProps.deletedPublicId !== deletedPublicId && deletedPublicId !== (null || undefined)) {
			inputInfo.uploadedImageArray.value.map((el, i) => {
				if (el.publicId === deletedPublicId) {
					inputInfo.uploadedImageArray.value.splice(i, 1);
					this.props.handleChange('uploadedImageArray')(inputInfo.uploadedImageArray.value);
				}
			})
		}

		if (
			imageUploadUrl
			&& imageUploadUrl.secureUrl) {
			if (prevProps.imageUploadUrl === undefined || null) {
				setNewArray();
			} else if (prevProps.imageUploadUrl.secureUrl !== imageUploadUrl.secureUrl) {
				setNewArray();
			}
		}
	}

	showAlert() {
		Alert.alert(
			'Please Allow Access',
			[
				'This applicaton needs access to your photo library to upload images.',
				'\n\n',
			].join(''),
			[
				{ text: 'Not Now', style: 'cancel' },
				{ text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
			],
		);
	}

	showConfirmDeleteAlert = (item) => {
		const { imageUploadRequest, imageUploadLoading } = this.props;
		if (imageUploadLoading
			&& imageUploadRequest === imageUploadStatus.removeUploadImage) return null;
		this.setState({ deletePulicId: item.publicId });
		Alert.alert(
			'You want to remove this image?',
			[
				'This image will not be uploaded when you remove it'
			].join(''),
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Remove',
					onPress: () => this.props.requestRemoveImageUploadAction({ public_id: item.publicId })
				},
			],
		);
	}

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				if (Platform.OS === 'ios') this.showAlert();
				return;
			}
		}
	}

	uploadImageAsync = async photo => {
		const data = new FormData();

		data.append("photo", {
			name: `${this.props.inputInfo.marketPlaceName.value.split(" ").join("_")}_image` || "",
			type: photo.type,
			uri:
				Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
		});

		this.props.requestImageUploadAction({ formData: data });
	}

	_pickImage = async () => {
		const { imageUploadRequest, imageUploadLoading, inputInfo } = this.props;
		if (imageUploadLoading
			&& imageUploadRequest === imageUploadStatus.imageUpload) return null;
		if (inputInfo.uploadedImageArray.value.length >= 5) {
			return Alert.alert(
				'You can\'t add more than 5 images',
				[
					'Be sure to add the images that best represent your market place'
				].join(''),
				[
					{ text: 'Cancel', style: 'cancel' }
				]
			)
		}
		await this.getPermissionAsync();
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
		});

		if (!result.cancelled) {
			this.setState({ image: result.uri });
		}

		if (result.uri) return this.uploadImageAsync(result);
	};

	render() {
		const {
			imageUploadRequest,
			inputInfo,
			formError,
			imageUploadLoading } = this.props;
		return (
			<View style={{ width }}>
				<Card
					title="UPLOAD IMAGES FOR YOUR MARKET PLACE"
					style={{ marginTop: 18, flex: 0 }}>
					{formError && inputInfo.uploadedImageArray.value.length === 0 && (
						<Text>{inputInfo.uploadedImageArray.errorMessage}</Text>
					)}

					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						flexWrap: "wrap"
					}}>
						<TouchableOpacity onPress={this._pickImage}>
							<View
								style={{
									borderRadius: theme.sizes.radius,
									backgroundColor: theme.colors.white,
									shadowColor: theme.colors.shadow,
									shadowOpacity: 1,
									shadowRadius: 10,
									shadowOffset: { width: 0, height: 0 },
									elevation: 2,
									marginBottom: theme.sizes.base,
									minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
									maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
									maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
								}}>
								<View style={{
									alignItems: 'center',
									justifyContent: 'center',
									height: '100%',
									borderRadius: theme.sizes.border,
									borderRadius: theme.sizes.border,
								}}>
									{imageUploadLoading
										&& imageUploadRequest === imageUploadStatus.imageUpload
										? (
											<Block middle>
												<ActivityIndicator size='large' color='blue' />
											</Block>
										) : (
											<View>
												< Entypo
													name="plus"
													color={theme.colors.shadow}
													size={theme.sizes.font * 5} />
												<Text caption>ADD IMAGE</Text>
											</View>
										)}
								</View>
							</View>
						</TouchableOpacity>

						{inputInfo.uploadedImageArray.value.map(image => (
							<View
								key={image.publicId}
								style={{
									borderRadius: theme.sizes.radius,
									backgroundColor: theme.colors.white,
									marginBottom: theme.sizes.base,
									minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
									maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
									maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
								}}>
								<View style={{
									height: '100%',
									borderRadius: theme.sizes.radius,
								}}>
									<ImageBackground
										source={{ uri: image.secureUrl }}
										style={{
											width: '100%',
											height: '100%',
											alignItems: 'center',
											justifyContent: 'center',
											borderRadius: theme.sizes.radius
										}}>
										<View>
											<TouchableOpacity onPress={() => this.showConfirmDeleteAlert(image)}>
												{imageUploadLoading
													&& imageUploadRequest === imageUploadStatus.removeUploadImage
													&& image.publicId === this.state.deletePulicId
													? (
														<Block middle>
															<ActivityIndicator size='large' color='white' />
														</Block>
													) : (
														< MaterialIcons
															name="delete"
															color={theme.colors.gray3}
															size={theme.sizes.font * 4} />
													)}
											</TouchableOpacity>
										</View>
									</ImageBackground>
								</View>
							</View>
						))}
					</View>
				</Card>

			</View >
		)
	}
}

export default UploadMarketPlaceImage;
