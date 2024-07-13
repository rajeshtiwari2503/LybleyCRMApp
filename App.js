import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigations/TabNavigation';
import { useState } from 'react';

export default function App() {
  const [login,setLogin]=useState(false)

  return (
    <View  className="flex-1 bg-white">
      
      <StatusBar style="auto" />
      {/* <LoginScreen /> */}
     {login ? ""
     
     : <View>      
            <View className="h-[400px] bg-yellow-400" ></View>
            <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md">
                <Text className="text-[30px] font-bold"> Community Marketplace</Text>
                <Text className="text-[18px] font-bold mt-6 mb-6"> Unlock Your Career Potential with JobApp
                    Discover Opportunities, Connect with Employers,
                    and Land Your Dream Job Today!   </Text>
                <TouchableOpacity onPress={()=>setLogin(true)} className="p-4 bg-blue-400 rounded-full">
                    <Text className="text-white text-center text-2xl">Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
}
    </View>
  );
}

 
