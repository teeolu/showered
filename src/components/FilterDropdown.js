import React, { Component } from "react";

import {
	StyleSheet,
	Dimensions,
	View,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Modal,
	ActivityIndicator
} from "react-native";

import { theme } from "../constants";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Text } from ".";

const options = [
	{
		heading: "Price range",
		type: "multiple",
		name: "price",
		_id: "1",
		options: [
			{ value: [500, 2000], option: "500 - 2,000", _id: "1" },
			{ value: [2001, 5000], option: "2,000 - 5,000", _id: "2" },
			{ value: [5001, 10000], option: "5,000 - 10,000", _id: "3" },
			{ value: [10001, 20000], option: "10,000 - 20,000", _id: "4" },
			{ value: [20001, 10000000], option: "20,000 - above", _id: "5" }
		]
	},
	{
		heading: "Delivery",
		name: "delivery",
		type: "multiple",
		_id: "2",
		options: [
			{ value: true, option: "Yes", _id: "1" },
			{ value: false, option: "No", _id: "2" },
			{ value: null, option: "Clear", _id: "3" }
		]
	}
];

export default class FilterDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			showDropdown: false,
			selectedIndex: ""
		};
	}

	render() {
		return (
			<View {...this.props}>
				{this._renderButton()}
				{this._renderModal()}
			</View>
		);
	}

	_updatePosition(callback) {
		if (this._button && this._button.measure) {
			this._button.measure((fx, fy, width, height, px, py) => {
				this._buttonFrame = { x: px, y: py, w: width, h: height };
				callback && callback();
			});
		}
	}

	show() {
		this._updatePosition(() => {
			this.setState({
				showDropdown: true
			});
		});
	}

	hide() {
		this.setState({
			showDropdown: false
		});
	}

	_renderButton() {
		return (
			<TouchableOpacity
				ref={button => (this._button = button)}
				style={{}}
				onPress={this._onButtonPress}>
				<Feather
					name="filter"
					color={theme.colors.gray}
					size={theme.sizes.font * 2}
				/>
			</TouchableOpacity>
		);
	}

	_onButtonPress = () => {
		const { onDropdownWillShow } = this.props;
		if (!onDropdownWillShow || onDropdownWillShow() !== false) {
			this.show();
		}
	};

	_renderModal() {
		const { accessible, dropdownStyle } = this.props;
		const { showDropdown, loading } = this.state;
		if (showDropdown && this._buttonFrame) {
			const frameStyle = this._calcPosition();
			const animationType = "fade";
			return (
				<Modal
					animationType={animationType}
					visible={true}
					transparent={true}
					onRequestClose={this._onRequestClose}
					supportedOrientations={[
						"portrait",
						"portrait-upside-down",
						"landscape",
						"landscape-left",
						"landscape-right"
					]}>
					<TouchableWithoutFeedback
						accessible={accessible}
						disabled={!showDropdown}>
						<View style={styles.modal}>
							<View style={[styles.dropdown, dropdownStyle, frameStyle]}>
								{loading ? this._renderLoading() : this._renderDropdown()}
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			);
		}
	}

	_calcPosition() {
		const { dropdownStyle, adjustFrame } = this.props;

		const dimensions = Dimensions.get("window");
		const windowWidth = dimensions.width;
		const windowHeight = dimensions.height;

		const dropdownHeight =
			(dropdownStyle && StyleSheet.flatten(dropdownStyle).height) ||
			StyleSheet.flatten(styles.dropdown).height;

		const bottomSpace =
			windowHeight - this._buttonFrame.y - this._buttonFrame.h;
		const rightSpace = windowWidth - this._buttonFrame.x;
		const showInBottom =
			bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
		const showInLeft = rightSpace >= this._buttonFrame.x;

		const positionStyle = {
			height: dropdownHeight,
			top: showInBottom
				? this._buttonFrame.y + this._buttonFrame.h
				: Math.max(0, this._buttonFrame.y - dropdownHeight)
		};

		if (showInLeft) {
			positionStyle.left = this._buttonFrame.x;
		} else {
			const dropdownWidth =
				(dropdownStyle && StyleSheet.flatten(dropdownStyle).width) ||
				StyleSheet.flatten({}).width ||
				-1;
			if (dropdownWidth !== -1) {
				positionStyle.width = dropdownWidth;
			}
			positionStyle.right = rightSpace - this._buttonFrame.w;
		}

		return adjustFrame ? adjustFrame(positionStyle) : positionStyle;
	}

	_onRequestClose = () => {
		const { onDropdownWillHide } = this.props;
		if (!onDropdownWillHide || onDropdownWillHide() !== false) {
			this.hide();
		}
	};

	_onModalPress = () => {
		const { onDropdownWillHide } = this.props;
		if (!onDropdownWillHide || onDropdownWillHide() !== false) {
			this.hide();
		}
	};

	_renderLoading() {
		return <ActivityIndicator size="small" />;
	}

	_renderDropdown() {
		const { onPressFilter, clearFilter, filters, triggerFilter } = this.props;
		const startFilter = () => {
			triggerFilter();
			this._onModalPress();
		};
		const triggerClearFilter = () => {
			clearFilter();
			this._onModalPress();
		};
		return (
			<View style={{ margin: 10 }}>
				<View>
					<Text h4 style={{ padding: 10 }}>
						Filter by:
					</Text>
				</View>
				<View>
					{options.map(o => (
						<View key={o._id}>
							{o.type === "multiple" ? (
								<View style={{}}>
									<Text style={{ padding: 10 }}>{o.heading}</Text>
								</View>
							) : (
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center"
									}}>
									<TouchableOpacity
									// onPress={handleChange("delivery", true)}
									>
										<Ionicons
											name={
												true ? "ios-radio-button-on" : "ios-radio-button-off"
											}
											style={{ margin: 10 }}
											color={true ? theme.colors.blue : theme.colors.gray}
											size={theme.sizes.font * 2}
										/>
									</TouchableOpacity>
									<Text>{o.heading}</Text>
								</View>
							)}
							{o.type === "multiple"
								? o.options.map(b => (
										<View key={b._id}>
											<View
												style={{
													display: "flex",
													flexDirection: "row",
													alignItems: "center"
												}}>
												<TouchableOpacity
													onPress={() => onPressFilter(o.name, b)}>
													<Ionicons
														name={
															filters[o.name]._id === b._id
																? "ios-radio-button-on"
																: "ios-radio-button-off"
														}
														style={{ margin: 10 }}
														color={true ? theme.colors.blue : theme.colors.gray}
														size={theme.sizes.font * 2}
													/>
												</TouchableOpacity>
												<Text>{b.option}</Text>
											</View>
										</View>
								  ))
								: null}
						</View>
					))}
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center"
					}}>
					<TouchableOpacity onPress={triggerClearFilter}>
						<Text style={{ color: theme.colors.purple, padding: 10 }}>
							Clear
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={startFilter}
						style={{
							backgroundColor: theme.colors.lightblue
						}}>
						<Text style={{ color: theme.colors.purple, padding: 10 }}>
							Filter
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonText: {
		fontSize: 12
	},
	modal: {
		flexGrow: 1
	},
	dropdown: {
		position: "absolute",
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "lightgray",
		borderRadius: 2,
		backgroundColor: "white",
		justifyContent: "center",
		width: Dimensions.get("window").width * 0.6
	},
	textContainer: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: theme.colors.gray3
	},
	loading: {
		alignSelf: "center"
	},
	list: {
		//flexGrow: 1,
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: "lightgray"
	},
	adminsMenu: {
		padding: 10,
		marginLeft: 10,
		borderRadius: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.colors.gray3
	}
});
