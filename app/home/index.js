import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import AppNavigator from '../AppNavigation';
import { requestUserPermission } from '../../utils/notificationService';

export default function Home() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Are you sure you want to exit?", [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", onPress: () => BackHandler.exitApp() }
      ]);
      return true; // Prevent default back action
    };

    // Add event listener for back button
    BackHandler.addEventListener("hardwareBackPress", backAction);

    // Request push notification permission
    requestUserPermission();

    return () => {
      // Remove event listener when component unmounts
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  return <AppNavigator />;
}
