import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import OverviewStack from './Overview';
import Analytics from '../screens/Analytics';
import Chat from '../screens/Chat';
import Settings from '../screens/Settings';
import Map from '../screens/Map';
import Vehicles from '../screens/Vehicles';
import BrowseContainer from '../containers/BrowseContainer';

export default createDrawerNavigator({
  OverviewStack,
  Analytics,
  Chat,
  Settings,
  Map,
  Vehicles,
  Browse: BrowseContainer
});
