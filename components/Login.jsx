// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { Colors } from '@/constants/Colors'
// import { useRouter } from 'expo-router'

// export default function Login() {
//     const router = useRouter();

//     return (
//         <View style={styles.root}>
//             <View style={styles.imageContainer}>
//                 <Image 
//                     source={require("../assets/images/Logo.png")}
//                     style={styles.image}
//                     resizeMode="contain"
//                 />
//             </View>
//             <View style={styles.container}>
//                 <View style={styles.txtContainer}>
//                     <Text style={styles.title}>
//                         Servsy provide services on Any areas
//                     </Text>
//                     <Text style={styles.description}>
//                         Delivering comprehensive, customer-focused solutions with innovative and reliable expertise.
//                     </Text>
//                     <TouchableOpacity 
//                         onPress={() => router.push("auth/sign-in")}
//                         style={styles.button}
//                     >
//                         <Text style={styles.buttonText}>Get Started</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     root: {
//         // flex: 1,
//         // backgroundColor: Colors.WHITE,
//     },
//     imageContainer: {
//         marginTop:-20,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     image: {
//         width: "100%",
//         height: 400,
//     },
//     container: {
//         backgroundColor: Colors.WHITE,
//         marginTop: -50,
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         height: "100%",
//         paddingTop: 20,
//     },
//     txtContainer: {
//         margin: 20,
//         alignItems: 'center',  // Center text container horizontally
//     },
//     title: {
//         fontSize: 30,
//         fontFamily: "outfit-bold",
//         textAlign: "center",
//         marginTop: 10,
//     },
//     description: {
//         fontSize: 17,
//         fontFamily: "outfit",
//         textAlign: "center",
//         color: Colors.GRAY,
//         marginTop: 25,
//     },
//     button: {
//         padding: 15,
//         backgroundColor: Colors.PRIMARY,
//         borderRadius: 99,
//         marginTop: "25%",
//         width: "100%",  // Ensure button stretches across the container
//         alignItems: 'center',  // Center text inside the button
//     },
//     buttonText: {
//         color: Colors.WHITE,
//         textAlign: "center",
//         fontFamily: "outfit",
//         fontSize: 17,
//     }
// });


import { View, Text, Image, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Exit App", "Are you sure you want to exit?", [
                { text: "Cancel", style: "cancel" },
                { text: "Exit", onPress: () => BackHandler.exitApp() }
            ]);
            return true; // Prevent default back action
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup on unmount
    }, []);

    return (
        <View style={styles.root}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require("../assets/images/Logo.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.container}>
                <View style={styles.txtContainer}>
                    <Text style={styles.title}>
                        Servsy provide services on Any areas
                    </Text>
                    <Text style={styles.description}>
                        Delivering comprehensive, customer-focused solutions with innovative and reliable expertise.
                    </Text>
                    <TouchableOpacity 
                        onPress={() => router.push("auth/sign-in")}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {},
    imageContainer: {
        marginTop: -20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: "100%",
        height: 400,
    },
    container: {
        backgroundColor: Colors.WHITE,
        marginTop: -50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: "100%",
        paddingTop: 20,
    },
    txtContainer: {
        margin: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontFamily: "outfit-bold",
        textAlign: "center",
        marginTop: 10,
    },
    description: {
        fontSize: 17,
        fontFamily: "outfit",
        textAlign: "center",
        color: Colors.GRAY,
        marginTop: 25,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: "25%",
        width: "100%",
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.WHITE,
        textAlign: "center",
        fontFamily: "outfit",
        fontSize: 17,
    }
});
