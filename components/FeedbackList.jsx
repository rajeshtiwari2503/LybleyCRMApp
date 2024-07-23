import React  from 'react';
import { View, Text, FlatList,  StyleSheet, ScrollView } from 'react-native';
import { Rating } from 'react-native-ratings';

const FeedbackPage = ({ data }) => {
   

  const renderFeedbackItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{item?.i}</Text>
      </View>
      <Text style={styles.itemText}>Ticket Number: {item.ticketNumber}</Text>
      <Text style={styles.itemText}>Service Date: {item.serviceDate}</Text>
      <Text style={styles.itemText}>Customer: {item.customerName}</Text>
      <Text style={styles.itemText}>Issues Faced: {item.issuesFaced}</Text>
      <Text style={styles.itemText}>Comments: {item.comments}</Text>
      <Text style={styles.itemText}>Future Service Interest: {item.futureServiceInterest}</Text>
      <View style={styles.row}>
        <Text style={styles.itemText}>Overall Satisfaction:</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={item.overallSatisfaction}
          style={styles.rating}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.itemText}>Service Quality:</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={item.serviceQuality}
          style={styles.rating}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.itemText}>Timeliness:</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={item.timeliness}
          style={styles.rating}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.itemText}>Professionalism:</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={item.professionalism}
          style={styles.rating}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.itemText}>Recommendation Likelihood:</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={item.recommendationLikelihood}
          style={styles.rating}
        />
      </View>
      <Text style={styles.itemText}>Created At: {new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback List</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item?._id} // Replace with your unique ID field
          renderItem={renderFeedbackItem}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    paddingLeft:10,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexDirection: 'column',

  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  indexContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 100,
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  indexText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rating: {
    marginLeft: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  rating: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
});

export default FeedbackPage;
