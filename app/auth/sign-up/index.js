import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Picker } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Colors } from '@/constants/Colors';
import Toast from 'react-native-toast-message';
import http_request from "../../../http_request";

export default function SignUp() {
    const navigation = useNavigation();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState('user'); // Default user type

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    });

    const { control, handleSubmit, getValues, formState: { errors } } = useForm();

    const onSubmit = data => {
        Register(data);
    };

    const Register = async (reqdata) => {
        try {
            setLoading(true);
            let response = await http_request.post('/userRegistration', reqdata);
            let { data } = response;
            console.log("data", data);
            setLoading(false);

            Toast.show({ type: 'success', text1: data.msg });
            router.push("auth/sign-in");
        } catch (err) {
            setLoading(false);
            Toast.show({ type: 'error', text: err?.response?.data?.msg });
            console.log(err);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Create new account</Text>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../../assets/images/Logo.png')}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>User Type</Text>
                    <Picker
                        selectedValue={userType}
                        style={styles.picker}
                        onValueChange={(itemValue) => setUserType(itemValue)}
                    >
                        <Picker.Item label="User" value="user" />
                        <Picker.Item label="Service Center" value="serviceCenter" />
                        <Picker.Item label="Technician" value="technician" />
                    </Picker>
                </View>

                {/* Common Fields */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: 'Name is required',
                            minLength: { value: 3, message: 'Name must be at least 3 characters long' }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.input, errors.name && styles.errorInput]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Name"
                            />
                        )}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email address</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.input, errors.email && styles.errorInput]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Email address"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        )}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contact No.</Text>
                    <Controller
                        control={control}
                        name="contact"
                        rules={{
                            required: 'Contact number is required',
                            pattern: { value: /^\d{10}$/, message: 'Contact No. must be at least 10 characters long' }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.input, errors.contact && styles.errorInput]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Contact No."
                                keyboardType="phone-pad"
                            />
                        )}
                    />
                    {errors.contact && <Text style={styles.errorText}>{errors.contact.message}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters long' }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.input, errors.password && styles.errorInput]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Password"
                                secureTextEntry
                            />
                        )}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: 'Confirm Password is required',
                            validate: value => value === getValues('password') || 'The passwords do not match'
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.input, errors.confirmPassword && styles.errorInput]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Confirm Password"
                                secureTextEntry
                            />
                        )}
                    />
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Address</Text>
                    <Controller
                        control={control}
                        name="address"
                        rules={{
                            required: 'Address is required',
                            minLength: { value: 10, message: 'Address must be at least 10 characters long' }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.input, errors.address && styles.errorInput]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Address"
                            />
                        )}
                    />
                    {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}
                </View>

                {/* Conditional Fields based on User Type */}
                {userType === 'serviceCenter' && (
                    <>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Service Center Name</Text>
                            <Controller
                                control={control}
                                name="serviceCenterName"
                                rules={{ required: 'Service Center Name is required' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[styles.input, errors.serviceCenterName && styles.errorInput]}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Service Center Name"
                                    />
                                )}
                            />
                            {errors.serviceCenterName && <Text style={styles.errorText}>{errors.serviceCenterName.message}</Text>}
                        </View>
                        {/* Add more service center specific fields here */}
                    </>
                )}

                {userType === 'technician' && (
                    <>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Technician ID</Text>
                            <Controller
                                control={control}
                                name="technicianId"
                                rules={{ required: 'Technician ID is required' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[styles.input, errors.technicianId && styles.errorInput]}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Technician ID"
                                    />
                                )}
                            />
                            {errors.technicianId && <Text style={styles.errorText}>{errors.technicianId.message}</Text>}
                                  </View>
                                  
                              </>
                          )}
                            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>

                <Text style={styles.signInText}>
                    Already registered?{' '}
                    <Text onPress={() => router.push("auth/sign-in")} style={styles.signInLink}>
                        Sign In
                    </Text>
                </Text>
            </View>
        </ScrollView>
    )}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 24,

        fontFamily: "outfit-bold",
        textAlign: 'center',
        marginBottom: 20,

    },
    logoContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        marginBottom: 20,
    },
    logo: {
        width: '100%', // Take full width of parent container
        height: 50, // Set height as per your requirement
        borderRadius: 4, // Apply border radius
        resizeMode: "cover",
    },
    form: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        fontFamily: "outfit"
    },
    input: {
        marginTop: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        fontFamily: "outfit"
    },
    errorInput: {
        borderColor: '#ff0000',
        fontFamily: "outfit"
    },
    errorText: {
        marginTop: 4,
        color: '#ff0000',
        fontSize: 12,
        fontFamily: "outfit"
    },
    button: {
        marginTop: 24,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        fontFamily: "outfit"
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "outfit-bold"
    },
    signInText: {
        marginTop: 16,
        textAlign: 'center',
        //   color: Colors.PRIMARY,
        fontFamily: "outfit"
    },
    signInLink: {
        color: Colors.PRIMARY,
        fontWeight: '600',
        fontFamily: "outfit"
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        fontFamily: "outfit",
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxText: {
        fontSize: 16,
        color: '#4F46E5',
        fontFamily: "outfit"
    },
})