import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import UserDashboard from '@/components/UserDashboard';
import { Colors } from '@/constants/Colors';

const Tab = createBottomTabNavigator();

const DealerNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#f8f8f8', // Tab bar background color
        borderTopWidth: 0,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      tabBarActiveTintColor: '#1e90ff', // Active tab color
      tabBarInactiveTintColor: '#888888', // Inactive tab color
    }}
  >
    <Tab.Screen 
      name="Dashboard" 
      component={UserDashboard}
      options={{
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color }) => (
          <Entypo name="home" size={24} color={color} />
        ),
      }}
    />
    {/* Add more screens here */}
  </Tab.Navigator>
);
export default DealerNavigator