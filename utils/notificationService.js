import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export async function requestUserPermission() {
  if (Platform.OS === "android" && Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Notification permission granted");
        getFCMToken();
      } else {
        console.log("Permission denied");
      }
    } catch (error) {
      console.log("Error requesting permission:", error);
    }
  } else {
    // For iOS or Android versions below 33, request Firebase permission
    const authStatus = await messaging().requestPermission();
    console.log("Authorization status:", authStatus);

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      getFCMToken();
    } else {
      console.log("Permission denied for notifications");
    }
  }
}

const getFCMToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
   
    let fcmToken=await AsyncStorage.getItem('fcmToken')
    if(!!fcmToken){
      console.log("Old FCM Token:", fcmToken);
    }else{
      const token = await messaging().getToken();
      await AsyncStorage.setItem('fcmToken',token)
      console.log("New FCM Token:", token);
    }
  } catch (err) {
    console.log("Error generating FCM token:", err);
  }
};
