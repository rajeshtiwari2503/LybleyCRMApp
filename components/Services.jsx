import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import http_request from "../http_request"; // Assuming this is your HTTP request module
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServiceDetails from './ServiceDetails';
import { MaterialIcons } from '@expo/vector-icons';
import UpdateServiceStatus from './UpdateServiceStatus';

const getStatusStyle = (status) => {
    switch (status) {
        case 'IN PROGRESS':
            return styles.inProgress;
        case 'PART PENDING':
            return styles.partPending;
        case 'ASSIGN':
            return styles.assign;
        case 'COMPLETED':
            return styles.completed;
        case 'CANCELED':
            return styles.canceled;
        default:
            return styles.defaultStatus;
    }
};

export default function ViewComplaints() {
    const router = useRouter();
    const [loading, setloading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [refresh, setRefresh] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [userData, setUserData] = useState(null);
    const [sampleComplaints, setComplaint] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);

    useEffect(() => {
        getAllComplaint();
    }, [refresh]);

    const getAllComplaint = async () => {
        try {
            setloading(true);
            const storedValue = await AsyncStorage.getItem('user');
            const user = JSON.parse(storedValue);
            setUserData(user?.user)
            let response = await http_request.get("/getAllComplaint");
            let { data } = response;
            const filteredData = user?.user.role === "ADMIN" ? data
                : user?.user.role === "BRAND" ? data.filter((item) => item?.brandId === user?.user?._id)
                    : user?.user.role === "USER" ? data.filter((item) => item?.userId === user?.user?._id)
                        : user?.user.role === "SERVICE" ? data.filter((item) => item?.assignServiceCenterId === user?.user?._id)
                            : user?.user.role === "TECHNICIAN" ? data.filter((item) => item?.technicianId === user?.user?._id)
                                : user?.user.role === "DEALER" ? data.filter((item) => item?.dealerId === user?.user?._id)
                                    : []
            const data1 = filteredData?.map((item, index) => ({ ...item, i: index + 1 }));
            setComplaint(data1);
            setloading(false);
        }
        catch (err) {
            setloading(false);
            console.log(err);
        }
    }

    const filterComplaints = (category) => {
        if (category === 'All') {
            return sampleComplaints;
        } else {
            return sampleComplaints.filter(complaint => complaint.status === category);
        }
    };

    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
    };

    const handleDetails = (item) => {
        setSelectedService(item);
        setModalVisible(true);
    }

    const handleUpdate = (item) => {
        setSelectedService(item);
        setUpdateModalVisible(true);
    }

    const RefreshData = (data) => {
        setRefresh(data);
    }

    const renderItem = ({ item, index }) => (
        <View key={index} style={styles.row}>
            <Text style={{ width: 50 }}>{item.i}</Text>
            <Text style={[{ paddingLeft: 13, width: 120 }]}>{item.productName}</Text>
            <Text style={[styles.statusCell, getStatusStyle(item?.status)]}>{item?.status === "ASSIGN" ? "ASSIGNED" : item?.status}</Text>
            <Text style={styles.cell}>{new Date(item.updatedAt).toLocaleString()}</Text>
            <View style={styles.actions}>
                {userData?.role === "TECHNICIAN" &&
                    ["ASSIGN", "PART PENDING", "IN PROGRESS", "PENDING"].includes(item?.status) ? (
                    <TouchableOpacity onPress={() => handleUpdate(item)}>
                        <MaterialIcons name="system-update-alt" size={24} color="blue" />
                    </TouchableOpacity>
                ) : null
                }
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleDetails(item)}>
                    <Ionicons name="eye" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: Colors.GRAY, borderRadius: 10 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'All' && styles.selectedButton]}
                        onPress={() => handleCategoryPress('All')}
                    >
                        <Text style={styles.buttonText}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'PENDING' && styles.selectedButton]}
                        onPress={() => handleCategoryPress('PENDING')}
                    >
                        <Text style={styles.buttonText}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'ASSIGN' && styles.selectedButton]}
                        onPress={() => handleCategoryPress('ASSIGN')}
                    >
                        <Text style={styles.buttonText}>Assigned</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'COMPLETED' && styles.selectedButton]}
                        onPress={() => handleCategoryPress('COMPLETED')}
                    >
                        <Text style={styles.buttonText}>Closed</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {loading ?
                <ActivityIndicator size="large" color="#0000ff" />
                : <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                    <View>
                        <View style={styles.header}>
                            <Text style={[styles.headerCell, { width: 60 }]}>Sr. No.</Text>
                            <Text style={[styles.headerCell, { width: 120 }]}>Product </Text>
                            <Text style={[styles.headerCell, { textAlign: "center", paddingRight: 20 }]}>Status</Text>
                            <Text style={styles.headerCell}>Updated At</Text>
                            <Text style={[styles.headerCell, { textAlign: 'center' }]}>Actions</Text>
                        </View>
                        <FlatList
                            data={filterComplaints(selectedCategory)}
                            keyExtractor={item => item?._id}
                            renderItem={renderItem}
                            contentContainerStyle={styles.listContainer}
                        />
                    </View>
                </ScrollView>
            }
            <ServiceDetails
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                service={selectedService}
            />
            <UpdateServiceStatus
                isVisible={updateModalVisible}
                onClose={() => setUpdateModalVisible(false)}
                service={selectedService}
                RefreshData={RefreshData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        marginTop: 25,
        borderRadius: 30
    },
    buttonContainer: {
        backgroundColor: Colors.GRAY,
        flexDirection: 'row',
        margin: 5,
    },
    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: Colors.LIGHT_GRAY,
        marginLeft: 10,
    },
    selectedButton: {
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        fontFamily: 'outfit',
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'outfit',
        color: Colors.BLACK,
    },
    listContainer: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f8f8f8',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'left',
        width: 110,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        alignItems: "center",
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        width: 120,
    },
    statusCell: {
        flex: 1,
        textAlign: 'center',
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        fontWeight: 'bold',
        width: 120,
        marginRight: 10,
        paddingVertical: 3,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 100,
    },
    inProgress: {
        backgroundColor: "#17A2B8", // Change Colors.PENDING to your desired color for IN PROGRESS
    },
    partPending: {
        backgroundColor: "#17A2B8", // Change Colors.SECONDARY to your desired color for PART PENDING
    },
    pending: {
        backgroundColor: "#FFC107", // Change Colors.SECONDARY to your desired color for PART PENDING
    },
    assign: {
        backgroundColor: "#A9A9A9", // Change Colors.COMPLETED to your desired color for ASSIGN
    },
    completed: {
        backgroundColor: "#28A745", // Change Colors.SUCCESS to your desired color for COMPLETED
    },
    canceled: {
        backgroundColor: "#DC3545", // Change Colors.ERROR to your desired color for CANCELED
    },
    defaultStatus: {
        backgroundColor: "#28A745", // Default background color
    }
});
