import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const Tab = createBottomTabNavigator();


export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="explore" component={ExploreScreen} />
        <Tab.Screen name="job" component={HomeScreen} />
        <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}