import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, Foundation, Ionicons, MaterialIcons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import ServiceScreen from '../screens/ServiceScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import SupportScreen from '../screens/SupportScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SkillScreen from '../screens/SkillScreen';
import InventoryScreen from '../screens/InventoryScreen';
import WalletScreen from '../screens/WalletScreen';
import { Colors } from '@/constants/Colors';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const TechnicianNavigator = () => {
  const [user, setUser] = useState(null);
  
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log('Error retrieving user data', error);
      }
    };

    checkUser();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFF', // Tab bar background color
          // borderTopWidth: 0,
          paddingBottom: 5, // Adjust bottom padding
          paddingTop: 5,    // Adjust top padding
          paddingLeft: 7,    // Adjust top padding
          paddingRight: 7,    // Adjust top padding
          // marginTop: 10,    // Adjust top padding
        },
        headerShown: false, // Hide header for all tabs
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: Colors.PRIMARY, // Active tab color
        tabBarInactiveTintColor: '#888888', // Inactive tab color
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.PRIMARY : 'gray', fontSize: 10 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Skill"
        component={SkillScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.PRIMARY : 'gray', fontSize: 10 }}>
              Skill
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Foundation name="social-skillshare" size={20} color={color} />
          ),
        }}
      />
      {user?.user?.independent &&
        <Tab.Screen
          name="Inventory"
          component={InventoryScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? Colors.PRIMARY : 'gray', fontSize: 10 }}>
                Inventory
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="inventory" size={20} color={color} />
            ),
          }}
        />
      }
      <Tab.Screen
        name="Services"
        component={ServiceScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.PRIMARY : 'gray', fontSize: 10 }}>
              Service
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="miscellaneous-services" size={20} color={color} />
          ),
        }}
      />
      {user?.user?.independent &&
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? Colors.PRIMARY : 'gray', fontSize: 10 }}>
                Wallet
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="account-balance-wallet" size={20} color={color} />
            ),
          }}
        />
      }
      <Tab.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.PRIMARY : 'gray', fontSize: 10 }}>
              Feedback
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="feedback" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.PRIMARY : 'gray', fontSize: 10 }}>
              Support
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="questioncircle" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.PRIMARY : 'gray', fontSize: 10 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>

  )
};

export default TechnicianNavigator;
