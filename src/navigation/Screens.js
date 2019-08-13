import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Analytics from '../screens/Analytics';
import Overview from '../screens/Overview/Overview';
import UserProfile from '../screens/UserProfile';
import Chat from '../screens/Chat';
import Settings from '../screens/Settings';
import Map from '../screens/Map';
import Vehicles from '../screens/Vehicles';
import MarketPlaceContainer from '../containers/MarketPlaceContainer';
import BrowseContainer from '../containers/BrowseContainer';
import CategoryDetailsContainer from '../containers/CategoryDetailsContainer';
import DrawerComponent from '../components/DrawerComponent';
import UserProfileContainer from '../containers/UserProfileContainer';

const BrowseStack =  createStackNavigator({
  Browse: BrowseContainer,
  CategoryDetails: CategoryDetailsContainer
},{
  headerMode: 'none'
});

const OverviewStack = createStackNavigator({
  Overview,
  BrowseStack,
})

const UserProfileStack = createStackNavigator({
  UserProfile: UserProfileContainer,
  BrowseStack,
})

const MarketPlaceStack = createStackNavigator({
  MarketPlaceContainer
});

export default createDrawerNavigator({
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
});
