import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const sampleComplaints = [
    { id: '1', title: 'Leaking Refrigerator', status: 'Open', date: '2024-07-01', category: 'Pending' },
    { id: '2', title: 'Washing Machine not spinning', status: 'In Progress', date: '2024-07-02', category: 'Assigned' },
    { id: '3', title: 'Air Conditioner not cooling', status: 'Closed', date: '2024-07-03', category: 'Closed' },
    { id: '4', title: 'Microwave not heating', status: 'Open', date: '2024-07-04', category: 'Pending' },
    { id: '5', title: 'TV screen cracked', status: 'In Progress', date: '2024-07-05', category: 'Assigned' },
    { id: '6', title: 'Oven not working', status: 'Closed', date: '2024-07-06', category: 'Closed' },
];

export default function ViewComplaints() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Function to filter complaints based on selected category
    const filterComplaints = (category) => {
        if (category === 'All') {
            return sampleComplaints;
        } else {
            return sampleComplaints.filter(complaint => complaint.category === category);
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
                <Text style={styles.cardTitle}>{item.title}</Text>
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
                    style={[styles.categoryButton, selectedCategory === 'Pending' && styles.selectedButton]}
                    onPress={() => handleCategoryPress('Pending')}
                >
                    <Text style={styles.buttonText}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.categoryButton, selectedCategory === 'Assigned' && styles.selectedButton]}
                    onPress={() => handleCategoryPress('Assigned')}
                >
                    <Text style={styles.buttonText}>Assigned</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.categoryButton, selectedCategory === 'Closed' && styles.selectedButton]}
                    onPress={() => handleCategoryPress('Closed')}
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
        // flex: 1,
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
