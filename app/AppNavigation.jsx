import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import UserNavigator from './UserNavigation';
import DealerNavigator from './DealerNavigation';
import TechnicianNavigator from './TechnicianNavigation';
import Login from "../components/Login";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
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
      } finally {
        // setLoading(false);
      }
    };

    checkUser();
  }, []);

 

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
