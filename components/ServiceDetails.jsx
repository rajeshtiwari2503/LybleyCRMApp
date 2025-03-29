// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import React from 'react';
// import { Colors } from '@/constants/Colors';
// import Modal from 'react-native-modal';
// import { MaterialIcons } from '@expo/vector-icons';

// export default function ServiceDetails({ isVisible, onClose, service }) {

//   // console.log(service);

//   return (
//     <Modal isVisible={isVisible} onBackdropPress={onClose}>
//       <View style={styles.modalContent}>
//       <View style={styles.headerContainer}>
//             <Text style={styles.header}>Service Details</Text>
//             <TouchableOpacity onPress={onClose}>
//               <MaterialIcons name="cancel" size={40} color="red" />
//             </TouchableOpacity>
//           </View>
//         <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>


//           <View style={styles.section}>
//             <Text style={styles.sectionHeader}>Product Information</Text>
//             <DetailItem label="Product Name" value={service.productName} />
//             <DetailItem label="Category Name" value={service.categoryName} />
//             <DetailItem label="Brand" value={service.productBrand} />
//             <DetailItem label="Model No" value={service.modelNo} />
//             <DetailItem label="Serial No" value={service.serialNo} />
//             <DetailItem label="Purchase Date" value={new Date(service.purchaseDate).toLocaleDateString()} />
//             <DetailItem label="Warranty Status" value={service.warrantyStatus ? 'Yes' : 'No'} />
//             <DetailItem label="Warranty Status" value={service?.payment} />
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.sectionHeader}>Service Information</Text>
//             <DetailItem label="Service ID" value={service._id} />
//             <DetailItem label="Status" value={service.status} />
//             <DetailItem label="Issue Type" value={service.issueType} />
//             <DetailItem label="Detailed Description" value={service.detailedDescription} />
//             {/* <Image source={{ uri: service.issueImages }} style={styles.issueImage} /> */}
//             <DetailItem label="Error Messages" value={service.errorMessages} />
//             <DetailItem label="Preferred Service Date" value={new Date(service.preferredServiceDate).toLocaleDateString()} />
//             <DetailItem label="Preferred Service Time" value={service.preferredServiceTime} />
//             <DetailItem label="Service Location" value={service.serviceLocation} />
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.sectionHeader}>Customer Information</Text>
//             <DetailItem label="Full Name" value={service.fullName} />
//             <DetailItem label="Phone Number" value={service.phoneNumber} />
//             <DetailItem label="Email Address" value={service.emailAddress} />
//             <DetailItem label="Alternate Contact Info" value={service.alternateContactInfo} />
//             <DetailItem label="Service Address" value={service.serviceAddress} />
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.sectionHeader}>Assignment Information</Text>
//             <DetailItem label="Assigned Service Center" value={service.assignServiceCenter} />
//             <DetailItem label="Technician" value={service?.assignTechnician} />
//             <DetailItem label="Technician Contact" value={service?.technicianContact} />
//             <DetailItem label="Comments" value={service.comments} />
//           </View>

//         </ScrollView>
//       </View>
//     </Modal>
//   )
// }

// const DetailItem = ({ label, value }) => (
//   <View style={styles.detailContainer}>
//     <Text style={styles.detailLabel}>{label}:</Text>
//     <Text style={styles.detailValue}>{value}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     justifyContent: 'center',
//     height: '90%',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     paddingBottom: 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: Colors.PRIMARY,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: Colors.PRIMARY,
//   },
//   detailContainer: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   detailLabel: {
//     fontWeight: 'bold',
//     flex: 2,
//     color: '#333',
//   },
//   detailValue: {
//     flex: 2,
//     color: '#666',
//   },
//   issueImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   closeButton: {
//     backgroundColor: '#f44336',
//     paddingVertical: 12,
//     borderRadius: 15,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });


import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';

const ServiceDetails = ({ isVisible, onClose, complaint }) => {
  if (!complaint) {
    return null;
  }

  const DetailItem = ({ label, value }) => (
    <View style={styles.detailContainer}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value || 'N/A'}</Text>
    </View>
  );

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Service Details</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="cancel" size={30} color="red" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Card style={[styles.card, styles.productInfo]}>
            <Card.Title title="Product Information" titleStyle={styles.cardTitle} />
            <Card.Content>
              <DetailItem label="Created At" value={new Date(complaint.createdAt).toLocaleString()} />
              <DetailItem label="Product Name" value={complaint.productName} />
              <DetailItem label="Category" value={complaint.categoryName} />
              <DetailItem label="Brand" value={complaint.productBrand} />
              <DetailItem label="Model Number" value={complaint.modelNo} />
              <DetailItem label="Serial Number" value={complaint.serialNo} />
              <DetailItem label="Purchase Date" value={new Date(complaint.purchaseDate).toLocaleString()} />
              <DetailItem label="Warranty Status" value={complaint.warrantyStatus} />
            </Card.Content>
          </Card>

          <Card style={[styles.card, styles.serviceInfo]}>
            <Card.Title title="Service Information" titleStyle={styles.cardTitle} />
            <Card.Content>
              <DetailItem label="Issue Type" value={complaint.issueType} />
              <DetailItem label="Detailed Description" value={complaint.detailedDescription} />
              <DetailItem label="Error Messages" value={complaint.errorMessages} />
              <DetailItem label="Preferred Service Date" value={new Date(complaint.preferredServiceDate).toLocaleString()} />
              <DetailItem label="Preferred Service Time" value={complaint.preferredServiceTime} />
              <DetailItem label="Service Location" value={complaint.serviceLocation} />
            </Card.Content>
          </Card>

          <Card style={[styles.card, styles.customerInfo]}>
            <Card.Title title="Customer Information" titleStyle={styles.cardTitle} />
            <Card.Content>
              <DetailItem label="Full Name" value={complaint.fullName} />
              <DetailItem label="Phone Number" value={complaint.phoneNumber} />
              <DetailItem label="Email Address" value={complaint.emailAddress} />
              <DetailItem label="Alternate Contact Info" value={complaint.alternateContactInfo} />
              <DetailItem label="Service Address" value={complaint.serviceAddress} />
              <DetailItem label="Pincode" value={complaint.pincode} />
              <DetailItem label="District" value={complaint.district} />
              <DetailItem label="State" value={complaint.state} />
            </Card.Content>
          </Card>

          {/* <Card style={[styles.card, styles.paymentInfo]}>
            <Card.Title title="Payment Information" titleStyle={styles.cardTitle} />
            <Card.Content>
              <DetailItem label="Payment Service Center" value={complaint.paymentServiceCenter} />
            </Card.Content>    
          </Card> */}

          <Card style={[styles.card, styles.assignmentInfo]}>
            <Card.Title title="Assignment Information" titleStyle={styles.cardTitle} />
            <Card.Content>
              <DetailItem label="Assigned Service Center" value={complaint.assignServiceCenter} />
              <DetailItem label="Assigned Time" value={new Date(complaint.assignServiceCenterTime).toLocaleString()} />
            </Card.Content>
          </Card>
          <Card style={[styles.card, styles.paymentInfo]}>
            <Card.Title title="Part pending Image" titleStyle={styles.cardTitle} />
            <Card.Content>
              {complaint.partPendingImage && typeof complaint.partPendingImage === 'string' && complaint.partPendingImage.startsWith('http') ? (
                <Image source={{ uri: complaint.partPendingImage }} style={styles.partImage} />
              ) : (
                <Text style={{ color: 'red' }}>Image not available</Text>
              )}
            </Card.Content>
          </Card>
          <Card style={[styles.card, styles.paymentInfo]}>
            <Card.Title title="Issue  Image" titleStyle={styles.cardTitle} />
            <Card.Content>
              {complaint.issueImages && typeof complaint.issueImages === 'string' && complaint.issueImages.startsWith('http') ? (
                <Image source={{ uri: complaint.issueImages }} style={styles.partImage} />
              ) : (
                <Text style={{ color: 'red' }}>Image not available</Text>
              )}
            </Card.Content>
          </Card>
          <Card style={[styles.card, styles.paymentInfo]}>
            <Card.Title title="Part Replace Image" titleStyle={styles.cardTitle} />
            <Card.Content>
              {complaint.partImage && typeof complaint.partImage === 'string' && complaint.partImage.startsWith('http') ? (
                <Image source={{ uri: complaint.partImage }} style={styles.partImage} />
              ) : (
                <Text style={{ color: 'red' }}>Image not available</Text>
              )}
            </Card.Content>
          </Card>
          <Card style={[styles.card, styles.historyInfo]}>
            <Card.Title title="Update Comment" titleStyle={styles.cardTitle} />
            <Card.Content>
              {complaint.updateHistory && complaint.updateHistory.length > 0 ? (
                complaint.updateHistory.map((history) => (
                  <View key={history._id} style={styles.commentContainer}>
                    <Text style={styles.commentDate}>
                      <Text style={styles.boldText}>Updated At:</Text> {new Date(history.updatedAt).toLocaleString()}
                    </Text>
                    {Object.entries(history.changes).map(([key, value]) =>
                      key !== "serviceCenterContact" && key !== "paymentBrand" ? (
                        <View key={key} style={styles.commentItem}>
                          <Text style={styles.commentLabel}>
                            {key.replace(/\b\w/, (char) => char.toUpperCase())}:
                          </Text>
                          <Text style={styles.commentValue}>
                            {typeof value === "object" ? JSON.stringify(value, null, 2) : value}
                          </Text>
                        </View>
                      ) : null
                    )}
                  </View>
                ))
              ) : (
                <Text>No updates available.</Text>
              )}
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    height: '80%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  productInfo: { backgroundColor: '#e3f2fd' },
  serviceInfo: { backgroundColor: '#fce4ec' },
  customerInfo: { backgroundColor: '#e8f5e9' },
  paymentInfo: { backgroundColor: '#fff3e0' },
  assignmentInfo: { backgroundColor: '#ede7f6' },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  historyInfo: { backgroundColor: '#f3e5f5' },
  commentContainer: { marginBottom: 10 },
  commentDate: { fontWeight: 'bold' },
  boldText: { fontWeight: 'bold' },
  commentText: { marginLeft: 10 },
  partImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  commentItem: {
    backgroundColor: "#f8f9fa", // Light gray background
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  commentLabel: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 14,
    marginBottom: 3,
  },
  commentValue: {
    fontSize: 14,
    color: "#555",
  },
});

export default ServiceDetails;
