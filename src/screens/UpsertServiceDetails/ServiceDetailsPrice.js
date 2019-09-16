import React, { PureComponent } from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Input, Card, Text } from "../../components";
import { theme } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

class ServiceDetailsPrice extends PureComponent {
	render() {
		const { inputInfo, blur, handleChange, removeTag } = this.props;

		return (
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
				<Card title="SERVICE DETAILS PRICE" style={{ flex: 1 }}>
					<Input
						full
						blur={blur}
						inputInfo={inputInfo}
						type="price"
						value={inputInfo.price.value}
						label="Price"
						onChangeText={handleChange("price")}
						style={{ marginBottom: 25 }}
					/>
					<Input
						full
						blur={blur}
						inputInfo={inputInfo}
						type="tags"
						value={inputInfo.tags.value}
						label="tags"
						subInputText={
							<View>
								<View
									style={{
										marginVertical: 5,
										display: "flex",
										flexDirection: "row",
										flexWrap: "wrap",
										width: "100%"
									}}>
									{inputInfo.tags.tagsArray.map((el, i) => {
										return (
											<TouchableOpacity
												key={i}
												onPress={() => removeTag(i, el)}
												style={{
													backgroundColor: theme.colors.lightblue,
													borderRadius: 50,
													display: "flex",
													flexDirection: "row",
													alignItems: "center",
													margin: 5
												}}>
												<Text
													style={{
														padding: 10,
														paddingRight: 5,
														color: theme.colors.white
													}}>
													{el}
												</Text>
												<MaterialIcons
													name="cancel"
													style={{ margin: 2 }}
													color={theme.colors.white}
													size={theme.sizes.font * 2}
												/>
											</TouchableOpacity>
										);
									})}
								</View>
								<Text caption>Separate your tags with comma ","</Text>
							</View>
						}
						onChangeText={handleChange("tags")}
						style={{ marginBottom: 25 }}
					/>
					<View>
						<Text
							style={{
								marginBottom: 10
							}}>
							Do you allow delivery?
						</Text>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center"
							}}>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center"
								}}>
								<TouchableOpacity onPress={handleChange("delivery", true)}>
									<Ionicons
										name={
											inputInfo.delivery.value
												? "ios-radio-button-on"
												: "ios-radio-button-off"
										}
										style={{ margin: 10 }}
										color={
											inputInfo.delivery.value
												? theme.colors.blue
												: theme.colors.gray
										}
										size={theme.sizes.font * 3}
									/>
								</TouchableOpacity>
								<Text>Yes</Text>
							</View>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									marginLeft: 20
								}}>
								<TouchableOpacity onPress={handleChange("delivery", false)}>
									<Ionicons
										name={
											inputInfo.delivery.value
												? "ios-radio-button-off"
												: "ios-radio-button-on"
										}
										style={{ margin: 10 }}
										color={
											inputInfo.delivery.value
												? theme.colors.gray
												: theme.colors.blue
										}
										size={theme.sizes.font * 3}
									/>
								</TouchableOpacity>
								<Text>No</Text>
							</View>
						</View>
					</View>
				</Card>
			</KeyboardAwareScrollView>
		);
	}
}

export default ServiceDetailsPrice;
