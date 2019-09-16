import React, { PureComponent } from "react";
import { Dimensions, View, TouchableOpacity, Image } from "react-native";

import { Card, Box, Block, Text } from "../../components";
const { width } = Dimensions.get("window");

export const categoryNames = [
	{ _id: "1", name: "Boutique" },
	{ _id: "2", name: "Store" },
	{ _id: "3", name: "Spa" },
	{ _id: "4", name: "Cinema" },
	{ _id: "5", name: "Restaurants" }
];

export class SelectCategory extends PureComponent {
	render() {
		const { styles, onPress, selected } = this.props;

		const adminIcon = (
			<Image
				source={require("../../assets/images/icons/energy.png")}
				style={{ height: 16, width: 14 }}
			/>
		);

		const operatorIcon = (
			<Image
				source={require("../../assets/images/icons/message.png")}
				style={{ height: 14, width: 14 }}
			/>
		);

		const checkIcon = (
			<Image
				source={require("../../assets/images/icons/check.png")}
				style={{ height: 18, width: 18 }}
			/>
		);

		let active = selected;
		return (
			<View style={{ width }}>
				<Card
					title="Select a category for your market place"
					style={[styles.margin, { marginTop: 18, flex: 0 }]}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							flexWrap: "wrap"
						}}>
						{categoryNames.map(name => (
							<TouchableOpacity
								onPress={() => onPress(name._id)}
								key={name._id}
								style={active === name.name ? styles.activeBorder : null}>
								<Block
									center
									middle
									style={[
										styles.card,
										selected === name._id ? styles.active : null
									]}>
									{selected === name._id ? (
										<Block center middle style={styles.check}>
											{checkIcon}
										</Block>
									) : null}
									<Block center middle style={styles.icon}>
										{operatorIcon}
									</Block>
									<Text h4 style={{ marginBottom: 11 }}>
										{name.name}
									</Text>
								</Block>
							</TouchableOpacity>
						))}
					</View>
				</Card>
			</View>
		);
	}
}

export default SelectCategory;
