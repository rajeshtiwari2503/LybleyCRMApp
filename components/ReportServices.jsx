import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ServiceDetails from './ServiceDetails';
import { Colors } from '@/constants/Colors';

const ReportServicesList = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const data = props?.data;
    const sortData = data?.map((item, index) => ({ ...item, i: index + 1 })) || [];

    // console.log("sortData", sortData);
    const handleDetails = (item) => {
        setSelectedService(item);
        setModalVisible(true);
    }

    const renderItem = ({ item, index }) => (
        <View key={index} style={styles.row}>
            <Text style={{ width: 50 }}>{item.i}</Text>
            <Text style={[{ paddingLeft: 13, width: 120 }]}>{item.productName}</Text>
            <Text style={styles.statusCell}>{item?.status === "ASSIGN" ? "ASSIGNED" : item?.status}</Text>
            <Text style={styles.cell}>{new Date(item.updatedAt).toLocaleString()}</Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleDetails(item)}>
                    <Ionicons name="eye" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {!data ? (
                <View>
                    <Text style={styles.title}>Filtered Services</Text>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </View>
            ) : sortData.length === 0 ? (
                <View style={styles.loader}>
                    <Text>No data available</Text>
                </View>
            ) : (
                <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                    <View>
                        <View style={styles.header}>
                            <Text style={[styles.headerCell, { width: 60 }]}>Sr. No.</Text>
                            <Text style={[styles.headerCell, { width: 120 }]}>Product</Text>
                            <Text style={[styles.headerCell, { textAlign: "center", paddingRight: 20 }]}>Status</Text>
                            <Text style={styles.headerCell}>Updated At</Text>
                            <Text style={[styles.headerCell, { textAlign: 'right' }]}>Actions</Text>
                        </View>
                        <FlatList
                            data={sortData}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={renderItem}
                        />
                    </View>
                </ScrollView>
            )}
             <ServiceDetails
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                service={selectedService}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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

export default ReportServicesList;
