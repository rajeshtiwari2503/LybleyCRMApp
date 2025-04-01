// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
// import { PermissionsAndroid, Platform } from 'react-native';

// export async function requestUserPermission() {
//   try {
//     if (Platform.OS === 'android') {
//       if (Platform.Version >= 33) {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
//         );

//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Notification permission denied');
//           return;
//         }
//       }
//       // Android below 33 does not need explicit permission
//       console.log('Notification permission granted (or not needed)');
//     } else {
//       // iOS Permission Request
//       const authStatus = await messaging().requestPermission();
//       if (
//         authStatus !== messaging.AuthorizationStatus.AUTHORIZED &&
//         authStatus !== messaging.AuthorizationStatus.PROVISIONAL
//       ) {
//         console.log('Permission denied for notifications on iOS');
//         return;
//       }
//     }

//     // If permission is granted, get FCM Token
//     await getFCMToken();
//   } catch (error) {
//     console.error('Error requesting permission:', error);
//   }
// }

// const getFCMToken = async () => {
//   try {
//     await messaging().registerDeviceForRemoteMessages();
    
//     let storedToken = await AsyncStorage.getItem('fcmToken');
//     const newToken = await messaging().getToken();

//     if (storedToken !== newToken) {
//       console.log('Updating FCM Token:', newToken);
//       await AsyncStorage.setItem('fcmToken', newToken);
//     } else {
//       console.log('Using existing FCM Token:', storedToken);
//     }
//   } catch (error) {
//     console.error('Error generating FCM token:', error);
//   }
// };

import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

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
    // Setup foreground notification handling
    setupForegroundNotification();
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

// Foreground Notification Handling
function setupForegroundNotification() {
  messaging().onMessage(async remoteMessage => {
    // Handle the foreground notification
    console.log('Foreground message received:', remoteMessage);
    
    // Show the notification title and body using an alert
    const { title, body } = remoteMessage.notification;
    Alert.alert(title, body);
    
    // You can also use this to trigger any custom UI element instead of Alert
  });
}

// Initialize the app with notification permission request
async function initialize() {
  await requestUserPermission();
}

// Call initialize on app load
initialize();
