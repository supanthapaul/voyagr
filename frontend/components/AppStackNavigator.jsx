import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Layout, Text } from '@ui-kitten/components';

import { createStackNavigator } from '@react-navigation/stack';
import TripDetailsScreen from './TripDetailsScreen';
import CreateScreen from './CreateScreen';
import HistoryScreen from './HistoryScreen';

const { Navigator, Screen } = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeIcon = (props) => (
  <Icon
    {...props}
    name='edit-outline'
  />
);

const HistoryIcon = (props) => (
  <Icon
    {...props}
    name='clock-outline'
  />
);


const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='HOME' icon={HomeIcon}/>
    <BottomNavigationTab title='HISTORY' icon={HistoryIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Tab.Screen name='Create' component={CreateScreen} options={{headerShown: false}}/>
    <Tab.Screen name='History' component={HistoryScreen} options={{headerShown: false}}/>
  </Tab.Navigator>
);

const HomeNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name='Home' component={TabNavigator}/>
    <Screen name='Details' component={TripDetailsScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
	<NavigationIndependentTree>
<NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
	</NavigationIndependentTree>
  
);
