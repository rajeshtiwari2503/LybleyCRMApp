import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import http_request from '../http_request';
import Toast from 'react-native-toast-message';
import FeedbackList from './FeedbackList';
 

const UserFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    getAllFeedback();
  }, [refresh]);

  const getAllFeedback = async () => {
    try {
      let response = await http_request.get("/getAllFeedback");
      let { data } = response;
      setFeedbacks(data);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch feedback',
      });
    }
  };

  const data = feedbacks?.map((item, index) => ({ ...item, i: index + 1 }));

  const RefreshData = (data) => {
    setRefresh(data);
  };

  return (
   <>
    <Toast ref={(ref) => Toast.setRef(ref)} />
      <View style={styles.container}>
        <ScrollView>
          <FeedbackList data={data} RefreshData={RefreshData} />
        </ScrollView>
      </View>
      </>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      marginTop:25,
      borderRadius:30
  },
})

export default UserFeedbacks;

