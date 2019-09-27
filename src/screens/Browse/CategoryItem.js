import React from "react";
import { TouchableOpacity, View, Image } from "react-native";

import { Text } from "../../components";
import { theme } from "../../constants";

export default CategoryItem = ({
	navigation,
	category,
	styles,
	requestSetCurrentServiceDetails
}) => {
	return (
		<TouchableOpacity
			onPress={() => {
				requestSetCurrentServiceDetails({
					navigation,
					navigateTo: "ServiceDetailsInfo",
					serviceDetails: category
				});
			}}>
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
					...styles.category
				}}>
				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
						height: "65%",
						borderRadius: theme.sizes.border,
						borderRadius: theme.sizes.border
					}}>
					<Image
						style={{
							width: "100%",
							height: "100%",
							overflow: "hidden"
						}}
						source={{ uri: category.uploadedImageArray[0].secureUrl }}
					/>
				</View>
				<View
					style={{
						padding: theme.sizes.base / 2
					}}>
					<Text h4 medium>
						{category.serviceName}
					</Text>
					<Text gray caption>
						{category.price} products
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};
