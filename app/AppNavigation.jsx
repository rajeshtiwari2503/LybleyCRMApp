import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View } from 'react-native';
import UserNavigator from './UserNavigation';
import DealerNavigator from './DealerNavigation';
import TechnicianNavigator from './TechnicianNavigation';
import Login from "../components/Login";
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

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

  if (!fontsLoaded) {
    console.log("Fonts not loaded yet.");
    // You can return null or some basic component if you want something to render before fonts load
    return null;
  }
  if (fontsLoaded) {
    console.log("Fonts successfully loaded.");
    
  }
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#0000ff',
        },
      }}
    >
      {user ? (
        <>
          {user?.user?.role === 'USER' && <Stack.Screen name="User" component={UserNavigator} />}
          {user?.user?.role === 'DEALER' && <Stack.Screen name="Dealer" component={DealerNavigator} />}
          {user?.user?.role === 'TECHNICIAN' && <Stack.Screen name="Technician" component={TechnicianNavigator} />}
          {['SERVICE', 'BRAND', 'ADMIN'].includes(user?.user?.role) && (
            <Stack.Screen name="RoleSelection" component={Login} />
          )}
        </>
      ) : (
        <Stack.Screen name="RoleSelection" component={Login} />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#0000ff",
    alignItems: 'center',
  },
});

export default AppNavigator;
