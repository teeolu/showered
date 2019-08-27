import React, { PureComponent } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";

import MarketPlaceSetting from "../../screens/MarketPlaceSettings";
import { Block, Text, Icon } from "../../components";
import { theme } from "../../constants";

class MarketPlaceSettingsContainer extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeftContainerStyle: {
			paddingLeft: 24
		},
		headerRightContainerStyle: {
			paddingRight: 24
		},
		headerLeft: (
			<TouchableOpacity onPress={() => navigation.pop()}>
				<Ionicons
					name="ios-arrow-round-back"
					color={theme.colors.gray}
					size={theme.sizes.font * 3}
				/>
			</TouchableOpacity>
		),
		headerRight: (
			<TouchableOpacity>
				<Icon notification />
			</TouchableOpacity>
		),
		headerTitle: (
			<Block row middle>
				<Text h4>Marketplace settings</Text>
			</Block>
		)
	});

	render() {
		return <MarketPlaceSetting {...this.props} />;
	}
}

export default MarketPlaceSettingsContainer;
