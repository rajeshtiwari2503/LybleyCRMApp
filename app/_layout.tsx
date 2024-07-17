// import { Stack } from "expo-router";
// import {useFonts} from "expo-font"
// export default function RootLayout() {

//   useFonts({
//     'outfit':require('../assets/fonts/Outfit-Regular.ttf'),
//     'outfit-medium':require('../assets/fonts/Outfit-Medium.ttf'),
//     'outfit-bold':require('../assets/fonts/Outfit-Bold.ttf')
//   })

  
//   return (
//     <Stack screenOptions={{headerShown:false}}>
      
//     <Stack.Screen name="(tab)" />
//     </Stack>
//   );
// }
import React from 'react';
import { View,StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tab)" />
    </Stack>
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set background color to white
  },
});