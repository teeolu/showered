import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import UpsertMarketPlaceContainer from "../containers/UpsertMarketPlaceContainer";
import BrowseContainer from "../containers/BrowseContainer";
import MarketplaceDetailsContainer from "../containers/MarketPlaceDetailsContainer";
import DrawerComponent from "../components/DrawerComponent";
import UserProfileContainer from "../containers/UserProfileContainer";
import UpsertServiceDetailsContainer from "../containers/UpsertServiceDetailsContainer";
import ServiceDetailsContainer from "../containers/ServiceDetailsContainer";
import MarketPlaceSettingsContainer from "../containers/MarketPlaceSettingsContainer";
import AdminSettingContainer from "../containers/MarketPlaceSettingsContainer/AdminSettingContainer";
import StaffSettingContainer from "../containers/MarketPlaceSettingsContainer/StaffSettingContainer";
import MoreMarketPlaceSettingsContainer from "../containers/MarketPlaceSettingsContainer/MoreMarketPlaceSettings";
import OverviewContainer from "../containers/OverviewContainer";

const AdminSettingStack = createStackNavigator(
	{
		AdminSetting: AdminSettingContainer
	},
	{
		headerMode: "none"
	}
);

const StaffSettingStack = createStackNavigator(
	{
		StaffSetting: StaffSettingContainer
	},
	{
		headerMode: "none"
	}
);

const MoreMarketplaceSettingStack = createStackNavigator(
	{
		MoreMarketplaceSetting: MoreMarketPlaceSettingsContainer
	},
	{
		headerMode: "none"
	}
);

const MarketPlaceSettingsStack = createStackNavigator({
	MarketPlaceSettingsContainer,
	AdminSettingStack,
	StaffSettingStack,
	MoreMarketplaceSettingStack
});

const MarketPlaceDetailsStack = createStackNavigator(
	{
		MarketplaceDetails: MarketplaceDetailsContainer,
		MarketPlaceSettingsStack
	},
	{
		headerMode: "none"
	}
);

const ServiceDetailsInfoStack = createStackNavigator({
	ServiceDetailsInfo: {
		screen: ServiceDetailsContainer,
		navigationOptions: {
			header: null
		}
	}
});

const BrowseStack = createStackNavigator(
	{
		Browse: BrowseContainer,
		ServiceDetailsInfoStack
	},
	{
		headerMode: "none"
	}
);

const OverviewStack = createStackNavigator({
	Overview: OverviewContainer,
	BrowseStack: {
		screen: BrowseStack,
		navigationOptions: {
			header: null
		}
	}
});

const MarketPlaceStack = createStackNavigator(
	{
		MarketPlaceDetailsStack,
		ServiceDetails: UpsertServiceDetailsContainer
	},
	{
		headerMode: "none"
	}
);

const UserProfileStack = createStackNavigator({
	UserProfile: UserProfileContainer,
	MarketPlaceStack
});

export default createDrawerNavigator(
	{
		OverviewStack,
		UserProfileStack,
		UpsertMarketPlaceContainer
	},
	{
		contentComponent: DrawerComponent
	}
);
