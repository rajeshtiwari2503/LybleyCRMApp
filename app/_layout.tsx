import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('user');
        if (storedValue) {
          const user = JSON.parse(storedValue);
          setUserData(user?.user?.role);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
     <Stack.Screen name="(tab)" />
      {/* {userData  === 'DEALER' && <Stack.Screen name="(dealer)" />}
      {userData  === 'TECHNICIAN' && <Stack.Screen name="(technician)" />} */}
    </Stack>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
