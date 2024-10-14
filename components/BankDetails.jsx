import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http_request from '../http_request';
import BankDetailsList from './BankDetailsList';  // Import your BankDetailsList component

const BankDetails = () => {
    const [bankDetails, setBankDetails] = useState([]);
    const [value, setValue] = useState(null);
    const [refresh, setRefresh] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getStoredValue = async () => {
            try {
                const storedValue = await AsyncStorage.getItem('user');
                if (storedValue) {
                    setValue(JSON.parse(storedValue));
                }
            } catch (err) {
                console.error('Failed to retrieve stored value', err);
            }
        };
        
        getStoredValue();
        getWalletDetails();
    }, [refresh]);

    const getWalletDetails = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('user');
            const value1 = JSON.parse(storedValue);
            setLoading(true);
            const response = await http_request.get(`/bankDetailByUser/${value1?.user?._id}`);
            setBankDetails(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching wallet details:', err);
            setLoading(false);
        }
    };

    const RefreshData = (data) => {
        setRefresh(Date.now());
    };

    const [refreshing, setRefreshing] = useState(false);

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

    return (
        <View style={styles.container}>
             <ScrollView  refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}  
            />
          }  >
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <BankDetailsList RefreshData={RefreshData} data={bankDetails} value={value} />
                )}
                {/* <Button title="Refresh" onPress={() => RefreshData(Date.now())} /> */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default BankDetails;
