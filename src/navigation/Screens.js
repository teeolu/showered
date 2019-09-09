import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import Analytics from "../screens/Analytics";
import Chat from "../screens/Chat";
import Settings from "../screens/Settings";
import Map from "../screens/Map";
import Vehicles from "../screens/Vehicles";
import MarketPlaceContainer from "../containers/UpsertMarketPlaceContainer";
import BrowseContainer from "../containers/BrowseContainer";
import CategoryDetailsContainer from "../containers/MarketPlaceDetailsContainer";
import DrawerComponent from "../components/DrawerComponent";
import UserProfileContainer from "../containers/UserProfileContainer";
import MarketPlaceServiceDetailsContainer from "../containers/UpsertServiceDetailsContainer";
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

const CategoryDetailStack = createStackNavigator(
	{
		CategoryDetails: CategoryDetailsContainer,
		MarketPlaceSettingsStack,
		ServiceDetails: MarketPlaceServiceDetailsContainer,
		ServiceDetailsInfo: ServiceDetailsContainer
	},
	{
		headerMode: "none"
	}
);

const MarketPlaceDetailsStack = createStackNavigator(
	{
		CategoryDetailStack
	},
	{
		headerMode: "none"
	}
);

const BrowseStack = createStackNavigator({
	Browse: BrowseContainer
});

const OverviewStack = createStackNavigator({
	Overview: OverviewContainer,
	BrowseStack
});

const UserProfileStack = createStackNavigator(
	{
		UserProfile: UserProfileContainer,
		MarketPlaceDetailsStack,
		BrowseStack
	},
	{
		headerMode: "none"
	}
);

const MarketPlaceStack = createStackNavigator({
	MarketPlaceContainer
});

export default createDrawerNavigator(
	{
		OverviewStack,
		UserProfileStack,
		Analytics,
		Chat,
		Settings,
		Map,
		Vehicles,
		MarketPlaceStack
	},
	{
		contentComponent: DrawerComponent
	}
);
