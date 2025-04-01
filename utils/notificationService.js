import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export async function requestUserPermission() {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission denied');
          return;
        }
      }
      // Android below 33 does not need explicit permission
      console.log('Notification permission granted (or not needed)');
    } else {
      // iOS Permission Request
      const authStatus = await messaging().requestPermission();
      if (
        authStatus !== messaging.AuthorizationStatus.AUTHORIZED &&
        authStatus !== messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('Permission denied for notifications on iOS');
        return;
      }
    }

    // If permission is granted, get FCM Token
    await getFCMToken();
  } catch (error) {
    console.error('Error requesting permission:', error);
  }
}

const getFCMToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    
    let storedToken = await AsyncStorage.getItem('fcmToken');
    const newToken = await messaging().getToken();

    if (storedToken !== newToken) {
      console.log('Updating FCM Token:', newToken);
      await AsyncStorage.setItem('fcmToken', newToken);
    } else {
      console.log('Using existing FCM Token:', storedToken);
    }
  } catch (error) {
    console.error('Error generating FCM token:', error);
  }
};
