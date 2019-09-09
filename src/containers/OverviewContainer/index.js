import React, { Component } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";

import { Block, Text, Icon } from "../../components";
import Overview from "../../screens/Overview/Overview";
import { requestSetCurrentMarketplace } from "../../modules/MarketplaceDetails/actions";

class OverviewContainer extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeftContainerStyle: {
			paddingLeft: 24
		},
		headerRightContainerStyle: {
			paddingRight: 24
		},
		headerLeft: (
			<TouchableOpacity onPress={navigation.openDrawer}>
				<Icon menu />
			</TouchableOpacity>
		),
		headerRight: (
			<TouchableOpacity>
				<Icon notification />
			</TouchableOpacity>
		),
		headerTitle: (
			<Block row middle>
				<Text h4>Overview</Text>
			</Block>
		)
	});

	componentDidMount() {
		requestSetCurrentMarketplace({ marketPlace: {} });
	}

	render() {
		const { userdata } = this.props;
		return <Overview userdata={userdata} {...this.props} />;
	}
}

const mapStateToProps = ({ authReducer }) => {
	return {
		userdata: authReducer.userdata
	};
};

const mapDispatchToProps = {
	requestSetCurrentMarketplace
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OverviewContainer);
