import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import http_request from "../http_request"; // Assuming this is your HTTP request module
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ViewComplaints() {
    const router = useRouter();
    const [loading, setloading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sampleComplaints, setComplaint] = useState([]);


    useEffect(() => {
        getAllComplaint();
    }, []);

    const getAllComplaint = async () => {
        try {
            setloading(true)
            const storedValue = await AsyncStorage.getItem('user');
            const user = JSON.parse(storedValue);

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
            setComplaint(data1)
            setloading(false)
        }
        catch (err) {
            setloading(false)
            console.log(err);
        }
    }
    // Function to filter complaints based on selected category
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

    const renderItem = ({ item, index }) => (
        <View key={index} style={styles.row}>
            <Text style={{ width: 50 }}>{item.i}</Text>
            <Text style={[{ paddingLeft: 13, width: 120 }]}>{item.productName}</Text>
            <Text style={styles.statusCell}>{item.status}</Text>
            <Text style={styles.cell}>{new Date(item.updatedAt).toLocaleString()}</Text>
            <View style={styles.actions}>
                {/* <TouchableOpacity onPress={() => handleDetails(item._id)}> */}
                <Ionicons name="eye" size={24} color="green" />
                {/* </TouchableOpacity> */}
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
                            <Text style={[styles.headerCell, { textAlign: 'right' }]}>Actions</Text>
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
        // borderRadius: 10,
    },
    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: Colors.LIGHT_GRAY,
        // marginRight: 10,
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
    card: {
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: 'outfit',
    },
    cardStatus: {
        fontSize: 16,
        fontFamily: 'outfit',
        color: Colors.GRAY,
    },
    cardDate: {
        fontSize: 14,
        fontFamily: 'outfit',
        color: Colors.GRAY,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: Colors.PRIMARY,
        color: "white",
        // marginLeft:20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // paddingLeft:20,
        paddingTop: 7,
        paddingBottom: 7,
        marginRight: 10,
        borderRadius: 10,
        width: 120,
    },
    actions: {
        flexDirection: 'row',
        width: 100,
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    viewButton: {
        color: 'blue',
        paddingRight: 10,
        textAlign: "right"
    },
    scrollContainer: {
        flexDirection: 'column',

    },
});
