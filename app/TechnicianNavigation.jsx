import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TechnicianDashboard from '../components/TechnicianDashboard';
 
 

const Tab = createBottomTabNavigator();

const TechnicianNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={TechnicianDashboard} />
   
  </Tab.Navigator>
);

export default TechnicianNavigator;