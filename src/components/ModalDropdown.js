import React, { Component } from "react";

import {
	StyleSheet,
	Dimensions,
	View,
	Text,
	TouchableWithoutFeedback,
	TouchableOpacity,
	FlatList,
	Modal,
	ActivityIndicator
} from "react-native";
import { Entypo } from "react-native-vector-icons";

import { theme } from "../constants";
const options = item => ({
	admins: [
		{
			name: `Remove ${item.person ? item.person.firstName : item.firstName}`,
			action: "removeAdmin",
			_id: "1"
		},
		{
			name: item.isActive
				? `Deactivate ${item.person ? item.person.firstName : item.firstName}`
				: `Activate ${item.person ? item.person.firstName : item.firstName}`,
			action: "disableAdmin",
			_id: "2"
		}
	],
	staffs: [
		{
			name: `Remove ${item.person ? item.person.firstName : item.firstName}`,
			action: "removeStaff",
			_id: "1"
		},
		{
			name: item.isActive
				? `Deactivate ${item.person ? item.person.firstName : item.firstName}`
				: `Activate ${item.person ? item.person.firstName : item.firstName}`,
			action: "disableStaff",
			_id: "2"
		}
	],
	pendingAdmins: [
		{
			name: `Remove ${item.firstName}`,
			action: "removePendingAdmin",
			_id: "1"
		}
	],
	pendingStaffs: [
		{
			name: `Remove ${item.firstName}`,
			action: "removePendingStaff",
			_id: "1"
		}
	]
});

export default class ModalDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: !options(this.props.adminDetails)[this.props.type],
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
				style={styles.adminsMenu}
				onPress={this._onButtonPress}>
				<Entypo
					name="dots-three-vertical"
					color={theme.colors.black3}
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
						disabled={!showDropdown}
						onPress={this._onModalPress}>
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
		const option = options(this.props.adminDetails);
		return (
			<FlatList
				style={styles.list}
				data={option[this.props.type]}
				keyExtractor={item => item.name}
				renderItem={this.renderNameAge}
			/>
		);
	}

	renderNameAge = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.textContainer}
				onPress={() => this.props[item.action](this.props.adminDetails)}>
				<View>
					<Text
						style={{
							color: theme.colors.black2,
							paddingHorizontal: 20,
							paddingVertical: 10,
							fontSize: 16
						}}>
						{item.name}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	_onRowPress = () => {
		this.setState({
			showDropdown: false
		});
	};
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
		justifyContent: "center"
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
