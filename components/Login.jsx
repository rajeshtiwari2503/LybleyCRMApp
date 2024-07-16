import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Login() {
const router=useRouter()

  return (
    <View>
       <Image source={require("../assets/images/Logo.png")} 
       style={{width:"100%",height:400}}
       />
       <View style={styles.container}>
        <Text style={{fontSize:30,fontFamily:"outfit-bold",textAlign:"center",marginTop:10}}>
            Ram Services on Any areas
        </Text>
        <Text style={{fontSize:17,fontFamily:"outfit",textAlign:"center",color:Colors.GRAY,marginTop:25}}>
        Delivering comprehensive, customer-focused solutions with innovative and reliable expertise.
        </Text>
        <TouchableOpacity onPress={()=>router.push("auth/sign-in")}
        style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
       </View>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,marginTop:-20,borderTopLeftRadius:30,borderTopRightRadius:30,height:"100%",padding:20
    },
    button:{
        padding:15,backgroundColor:Colors.PRIMARY,borderRadius:99,marginTop:"25%"
    },
    buttonText:{
        color:Colors.WHITE,textAlign:"center",fontFamily:"outfit",fontSize:17
    }
})