import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function LoginScreen() {
    const [login,setLogin]=useState(false)
    return (
        <View>
            {/* <Image source={require('../../assets/icon.png')}
                className="w-full h-[400px] object-cover"
            /> */}
            <View className="h-[400px] bg-black" >g</View>
            <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md">
                <Text className="text-[30px] font-bold"> Community Marketplace</Text>
                <Text className="text-[18px] font-bold mt-6 mb-6"> Unlock Your Career Potential with JobApp
                    Discover Opportunities, Connect with Employers,
                    and Land Your Dream Job Today!   </Text>
                <TouchableOpacity onPress={()=>setLogin(true)} className="p-4 bg-blue-400 rounded-full">
                    <Text className="text-white text-center text-2xl">Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}