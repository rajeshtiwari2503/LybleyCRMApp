import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import http_request from "../../http_request"; // Assuming this is your HTTP request module
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 

export default function ViewComplaints() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sampleComplaints, setComplaint] = useState([]);


    useEffect(() => {
        getAllComplaint();
      }, [ ]);
 
    const getAllComplaint = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('user');
              const user = JSON.parse(storedValue);
              
          let response = await http_request.get("/getAllComplaint");  
          let { data } = response;
          const filteredData = user?.user.role === "ADMIN" ? data
          : user?.user.role === "BRAND" ? data.filter((item) => item?.brandId === user?.user?._id)
            : user?.user.role === "USER" ? data.filter((item) => item?.userId === user?.user?._id)
              : user?.user.role === "SERVICE" ? data.filter((item) => item?.assignServiceCenterId ===  user?.user?._id)
                : user?.user.role === "TECHNICIAN" ? data.filter((item) => item?.technicianId ===  user?.user?._id)
                  : user?.user.role === "DEALER" ? data.filter((item) => item?.dealerId ===   user?.user?._id)
                    : []
          setComplaint(filteredData)
        }
        catch(err){
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

    const renderComplaint = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: 'complaint-details', params: { complaintId: item.id } })}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.productName}</Text>
                <Text style={styles.cardStatus}>{item.status}</Text>
            </View>
            <Text style={styles.cardDate}>{item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
          <View style={{backgroundColor:Colors.GRAY,borderRadius:10}}>
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
            <FlatList
                data={filterComplaints(selectedCategory)}
                keyExtractor={item => item.id}
                renderItem={renderComplaint}
                contentContainerStyle={styles.listContainer}
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
        marginTop:35
    },
    buttonContainer: {
      backgroundColor:Colors.GRAY,
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
});
