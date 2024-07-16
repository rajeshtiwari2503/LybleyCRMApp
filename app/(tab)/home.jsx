import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


export default function Home() {
const router=useRouter()

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('user');
          
          router.push("/auth/sign-in"); // Navigate to login page after logout
        } catch (error) {
          console.log('Error clearing user data', error);
        }
      };
  return (
    <View>
       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{marginTop:"30px"}} onPress={()=>handleLogout()}>Logout</Text>
    </View>
    </View>
  )
}