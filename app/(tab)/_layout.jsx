import {   Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors'
 

export default function TabLayout() {
 

  return (
    <Tabs 
    screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY,
         tabBarStyle:{height:70,paddingTop:5}
        }}>
        <Tabs.Screen name="home" 
        options={{
            tabBarLabel: ({ focused }) => (
                <Text style={{ color: focused ? Colors.PRIMARY : 'gray', marginBottom: 15, fontSize: 12 }}>
                  Home
                </Text>
              ),
            tabBarIcon:({color})=><Entypo name="home" size={24} color={color}style={{ marginTop: 5 }} />
        }}
        />
        <Tabs.Screen name="product"
        options={{
            tabBarLabel: ({ focused }) => (
                <Text style={{ color: focused ? Colors.PRIMARY : 'gray', marginBottom: 15, fontSize: 12 }}>
                  Product
                </Text>
              ),
            tabBarIcon:({color})=><MaterialIcons name="category"  size={24} color={color}style={{ marginTop: 5 }} />
        }}
        />
        <Tabs.Screen name="services"
        options={{
            tabBarLabel: ({ focused }) => (
                <Text style={{ color: focused ? Colors.PRIMARY : 'gray', marginBottom: 15, fontSize: 12 }}>
                  Services
                </Text>
              ),
            tabBarIcon:({color})=><MaterialIcons name="miscellaneous-services"size={24} color={color}style={{ marginTop: 5 }} />
        }}
        />
         <Tabs.Screen name="feedback"
        options={{
            tabBarLabel: ({ focused }) => (
                <Text style={{ color: focused ? Colors.PRIMARY : 'gray', marginBottom: 15, fontSize: 12 }}>
                  Feedback
                </Text>
              ),
            tabBarIcon:({color})=><MaterialIcons name="feedback"  size={24} color={color}style={{ marginTop: 5 }} />
        }}
        />
         <Tabs.Screen name="support"
        options={{
            tabBarLabel: ({ focused }) => (
                <Text style={{ color: focused ? Colors.PRIMARY : 'gray', marginBottom: 15, fontSize: 12 }}>
                  Support
                </Text>
              ),
            tabBarIcon:({color})=><AntDesign name="questioncircle"  size={24} color={color}style={{ marginTop: 5 }} />
        }}
        />
         <Tabs.Screen name="profile"
        options={{
            tabBarLabel: ({ focused }) => (
                <Text style={{ color: focused ? Colors.PRIMARY : 'gray', marginBottom: 15, fontSize: 12 }}>
                  Profile
                </Text>
              ),
            tabBarIcon:({color})=><Ionicons name="person"  size={24} color={color}style={{ marginTop: 5 }} />
        }}
        />
    </Tabs>
  )
}