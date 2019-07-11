import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Analytics from '../screens/Analytics';
import Overview from '../screens/Overview/Overview';
import Chat from '../screens/Chat';
import Settings from '../screens/Settings';
import Map from '../screens/Map';
import Vehicles from '../screens/Vehicles';
import MarketPlaceContainer from '../containers/MarketPlaceContainer';
import BrowseContainer from '../containers/BrowseContainer';
import CategoryDetailsContainer from '../containers/CategoryDetailsContainer';
import DrawerComponent from '../components/DrawerComponent';

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

const MarketPlaceStack = createStackNavigator({
  MarketPlaceContainer
})

export default createDrawerNavigator({
  OverviewStack,
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
