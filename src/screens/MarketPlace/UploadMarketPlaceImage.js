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
import Entypo from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { Card, Block } from '../../components';
import { theme } from '../../constants';
import { imageUploadStatus } from '../../modules/imageUpload/reducers';
const { width } = Dimensions.get('window');

export class UploadMarketPlaceImage extends PureComponent {
	state = {
		image: null,
		errorAlert: false,
		errorMessage: ""
	};

	componentDidUpdate(prevProps, prevState) {
		const { imageUploadUrl } = this.props;

		const setNewArray = () => {
			const newUploadedImageArray = [...this.props.inputInfo.uploadedImageArray.value];

			const index = newUploadedImageArray.findIndex(el => el.secureUrl === imageUploadUrl.secureUrl);
			if (index === -1) {
				newUploadedImageArray.push(this.props.imageUploadUrl);
			};
			this.props.handleChange('uploadedImageArray')(newUploadedImageArray);
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
				'Please go to Settings of your device and grant permissions to Photos.',
			].join(''),
			[
				{ text: 'Not Now', style: 'cancel' },
				{ text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
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
			imageUploadLoading } = this.props;
		return (
			<View style={{ width }}>
				<Card
					title="UPLOAD IMAGES FOR YOUR MARKET PLACE"
					style={{ marginTop: 18, flex: 0 }}
				>
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
										) : (< Entypo
											name="images"
											color={theme.colors.shadow}
											size={theme.sizes.font * 3} />
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
									alignItems: 'center',
									justifyContent: 'center',
									height: '100%',
									borderRadius: theme.sizes.radius,
									shadowColor: theme.colors.shadow,
									shadowOpacity: 1,
									shadowRadius: 10,
									shadowOffset: { width: 0, height: 0 },
									elevation: 2,
								}}>
									<ImageBackground
										source={{ uri: image.secureUrl }}
										style={{
											width: '100%',
											height: '100%',
											borderRadius: theme.sizes.radius,
											shadowColor: theme.colors.shadow,
											shadowOpacity: 1,
											shadowRadius: 10,
											shadowOffset: { width: 0, height: 0 },
											elevation: 2
										}}>
										{/* <Text>Inside</Text> */}
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
