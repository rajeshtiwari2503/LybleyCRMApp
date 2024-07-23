import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import http_request from '../http_request';
import FeedbackList from './FeedbackList';

const UserFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    getAllFeedback();
  }, [refresh]);

  const getAllFeedback = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      let response = await http_request.get("/getAllFeedback");
      let { data } = response;
      setFeedbacks(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // Set loading to false after data is fetched
    }
  };

  const data = feedbacks?.map((item, index) => ({ ...item, i: index + 1 }));

  const RefreshData = (data) => {
    setRefresh(data);
  };

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // Show loading indicator
        ) : (
          <FeedbackList data={data} RefreshData={RefreshData} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 25,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default UserFeedbacks;
