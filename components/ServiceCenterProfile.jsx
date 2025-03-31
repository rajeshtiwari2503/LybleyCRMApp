import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView,
    Image, ActivityIndicator, RefreshControl
} from 'react-native';
import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import Wallet from './Wallet';
import EditServiceCenterProfile from './EditServiceCenterProfile';

export default function ServiceCenterProfile(props) {
    const [isModalVisible, setModalVisible] = useState(false);
    const { user, RefreshData, handleLogout } = props;
    const [wallet, setWallet] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleWallet = () => setWallet(true);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (typeof RefreshData === 'function') {
            RefreshData();
        } else {
            console.error("RefreshData is not a function");
        }
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [RefreshData]);
// console.log("props",user);

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={styles.container}
        >
            {/* Header */}
            <View style={styles.header}>
                <View>
                <Text style={styles.headerText}>Service Center Profile</Text>
                </View>
                <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            {/* <Text style={styles.logoutButtonText}>Logout</Text> */}
                            <MaterialIcons name="logout" size={20} color="#fff" style={styles.logoutIcon} />
                        </TouchableOpacity>
                    </View>
            </View>

            {/* Profile Section */}
            <View style={styles.profileCard}>
                {/* <Image source={{ uri: user?.profilePicture }} style={styles.profileImage} /> */}
                <View style={styles.profileCard2}>
                    <Text style={styles.name}>{user?.serviceCenterName}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                   
                </View>

            </View>

            {/* Information Section */}
            <View style={styles.infoContainer}>
    {[
         { icon: "money", color: "#3F51B5", text: `Total Amount: ₹${user?.totalAmount}` },
         { icon: "account-balance-wallet", color: "#4CAF50", text: `Wallet: ₹${user?.walletAmount}` },
        { icon: "business", color: "#3F51B5", text: user?.serviceCenterName },
        { icon: "category", color: "#3F51B5", text: user?.serviceCenterType },
        { icon: "badge", color: "#FF9800", text: user?.registrationNumber },
        { icon: "confirmation-number", color: "#3F51B5", text: user?.tin },
        { icon: "person", color: "#4CAF50", text: user?.contactPersonName },
        { icon: "work", color: "#4CAF50", text: user?.contactPersonPosition },
        { icon: "email", color: "#3F51B5", text: user?.email },
        { icon: "phone", color: "#4CAF50", text: user?.contact },
        { icon: "location-on", color: "#4CAF50", text: `${user?.streetAddress}, ${user?.city}, ${user?.state}, ${user?.country}` },
        { icon: "map", color: "#3F51B5", text: `Pincode: ${user?.postalCode}` },
        {
            icon: "build",
            color: "#FF9800",
            text: `Categories: ${user?.serviceCategories?.map(cat => cat.label).join(", ") || "N/A"}`
          },
          {
            icon: "branding-watermark",
            color: "#3F51B5",
            text: `Brands: ${user?.brandsSupported?.map(brand => brand.label).join(", ") || "N/A"}`
          }
          
,          
        { icon: "location-searching", color: "#4CAF50", text: `Pincode Coverage: ${user?.pincodeSupported?.join(", ")}` },
        { icon: "verified", color: "#FF9800", text: user?.technicianCertifications },
        { icon: "schedule", color: "#3F51B5", text: `Operating Hours: ${user?.operatingHours}` },
        { icon: "calendar-today", color: "#4CAF50", text: `Years in Operation: ${user?.yearsInOperation}` },
        { icon: "engineering", color: "#FF9800", text: `${user?.numberOfTechnicians} Technicians` },
        { icon: "access-time", color: "#3F51B5", text: `Turnaround Time: ${user?.averageTurnaroundTime}` },
        { icon: "verified-user", color: "#FF9800", text: user?.verification },
        
       
        { icon: "policy", color: "#FF9800", text: `Agreement: ${user?.agreement ? "Accepted" : "Not Accepted"}` },
        { icon: "lock", color: "#3F51B5", text: `Status: ${user?.status}` }
    ].map((item, index) => (
        <View key={index} style={styles.infoBox}>
            <Icon name={item.icon} size={24} color={item.color} />
            <Text style={styles.infoText}>{item.text}</Text>
        </View>
    ))}
</View>



            {/* Wallet Section */}
            {wallet && <Wallet />}

            {/* Logout Button */}

            {/* Edit Profile Modal */}
            <EditServiceCenterProfile
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                user={user}
                RefreshData={RefreshData}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
    },
    header: {
        backgroundColor: "#09090b",
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        marginBottom: 15,
    paddingLeft:20,
    paddingRight:20,
        elevation: 5,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileCard: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius: 20,
        alignItems: 'center',
        padding: 10,

        marginBottom: 15,
        elevation: 3,
    },
    profileCard2: {
        backgroundColor: '#fff',

        borderRadius: 20,
        alignItems: 'center',
        padding: 10,

        // marginBottom: 15,
        elevation: 3,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: Colors.PRIMARY,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 10,
        elevation: 3,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        elevation: 3,
        marginBottom: 20,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    infoText: {
        fontSize: 16,
        marginLeft: 16,
    },
    buttonContainer: {
        // marginTop:10,
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#ff4757',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
        elevation: 3,
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

